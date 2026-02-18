// Service for sending Telegram notifications
// Uses Vercel Serverless Function to avoid CORS issues and keep bot token secure

const ADMIN_CHAT_ID = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID || '';

// Use Vercel API route in production (always on Vercel)
// In development, try Vercel API first, fallback to direct API (may fail due to CORS)
const USE_VERCEL_API = import.meta.env.PROD || import.meta.env.VITE_USE_VERCEL_API === 'true';

export class TelegramService {
  /**
   * Send notification via Vercel API route (recommended) or direct API (fallback)
   */
  private static async sendViaAPI(
    type: 'new_user' | 'website_registration' | 'lesson_booking' | 'support_message',
    data: any
  ): Promise<{ success: boolean; error?: string }> {
    if (!ADMIN_CHAT_ID) {
      console.warn('Admin chat ID not configured, skipping Telegram notification');
      return { success: false, error: 'Chat ID not configured' };
    }

    try {
      // Try Vercel API route first (works in production)
      const apiUrl = USE_VERCEL_API
        ? '/api/telegram-notify'
        : 'https://api.telegram.org/bot8098211455:AAHgn_Tnl23c5Vr2AE2c1GuhuyUXKgj27N4/sendMessage';

      if (USE_VERCEL_API) {
        // Use Vercel Serverless Function
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            chatId: ADMIN_CHAT_ID,
            data,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error('Telegram API error:', result);
          return { success: false, error: result.error || 'Failed to send message' };
        }

        return { success: true };
      } else {
        // Fallback: direct API call (may fail due to CORS in browser)
        // This is only for local development testing
        const message = this.formatMessage(type, data);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: ADMIN_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          console.error('Telegram API error:', result);
          // If CORS error, suggest using Vercel API
          if (result.error?.includes('CORS') || response.status === 0) {
            console.warn('CORS error detected. Use Vercel API route in production.');
          }
          return { success: false, error: result.description || 'Failed to send message' };
        }

        return { success: true };
      }
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      // If it's a CORS error, suggest using Vercel API
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Network error. In production, use Vercel API route.');
      }
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Format message based on type
   */
  private static formatMessage(type: string, data: any): string {
    switch (type) {
      case 'new_user':
        return `
🆕 <b>New User Registered</b>

👤 <b>Name:</b> ${data.name || 'Not provided'}
📧 <b>Email:</b> ${data.email || 'Not provided'}
📱 <b>Phone:</b> ${data.phone || 'Not provided'}
😰 <b>Anxiety Level:</b> ${data.anxietyLevel ? `${data.anxietyLevel}/5` : 'Not set'}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();

      case 'website_registration':
        return `
📝 <b>Registratsioon veebilehel</b>

👤 <b>Nimi:</b> ${data.name || 'Not provided'}
📧 <b>Email:</b> ${data.email || 'Not provided'}
📱 <b>Telefon:</b> ${data.phone || 'Not provided'}

⏰ <b>Aeg:</b> ${new Date().toLocaleString('et-EE', { timeZone: 'Europe/Tallinn' })}
        `.trim();

      case 'lesson_booking':
        const lessonTypeEmoji = data.type === 'theory' ? '📚' : '🚗';
        const lessonTypeText = data.type === 'theory' ? 'Theory' : 'Practice';
        return `
📅 <b>New Lesson Booking</b>

👤 <b>Student:</b> ${data.userName || 'Not provided'}
📧 <b>Email:</b> ${data.userEmail || 'Not provided'}
👨‍🏫 <b>Instructor:</b> ${data.instructorName}
${lessonTypeEmoji} <b>Type:</b> ${lessonTypeText}
📆 <b>Date:</b> ${data.date}
🕐 <b>Time:</b> ${data.time}

⏰ <b>Booked at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();

      case 'support_message':
        const anxietyEmoji = data.anxietyLevel
          ? data.anxietyLevel >= 4
            ? '🔴'
            : data.anxietyLevel >= 3
            ? '🟡'
            : '🟢'
          : '⚪';
        const messageText = data.messageText.length > 500
          ? data.messageText.substring(0, 500) + '...'
          : data.messageText;
        return `
💬 <b>New Support Request</b>

👤 <b>Student:</b> ${data.userName || 'Not provided'}
📧 <b>Email:</b> ${data.userEmail || 'Not provided'}
${anxietyEmoji} <b>Anxiety Level:</b> ${data.anxietyLevel ? `${data.anxietyLevel}/5` : 'Not set'}

💭 <b>Message:</b>
${messageText}

⏰ <b>Sent at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();

      default:
        return '';
    }
  }

  /**
   * Send notification to admin about new user registration
   */
  static async notifyNewUser(user: {
    name: string | null;
    email: string | null;
    phone: string | null;
    anxietyLevel: number | null;
  }): Promise<void> {
    const result = await this.sendViaAPI('new_user', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      anxietyLevel: user.anxietyLevel,
    });
    if (!result.success) {
      throw new Error(result.error || 'Failed to send Telegram notification');
    }
  }

  /**
   * Send notification to admin about website registration (form on site)
   */
  static async notifyWebsiteRegistration(user: {
    name: string | null;
    email: string | null;
    phone: string | null;
  }): Promise<void> {
    const result = await this.sendViaAPI('website_registration', {
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    if (!result.success) {
      throw new Error(result.error || 'Failed to send Telegram notification');
    }
  }

  /**
   * Send notification to admin about lesson booking
   */
  static async notifyLessonBooking(booking: {
    userName: string | null;
    userEmail: string | null;
    instructorName: string;
    date: string;
    time: string;
    type: 'theory' | 'driving';
  }): Promise<void> {
    await this.sendViaAPI('lesson_booking', {
      userName: booking.userName,
      userEmail: booking.userEmail,
      instructorName: booking.instructorName,
      date: booking.date,
      time: booking.time,
      type: booking.type,
    });
  }

  /**
   * Send notification to admin about support message
   */
  static async notifySupportMessage(message: {
    userName: string | null;
    userEmail: string | null;
    anxietyLevel: number | null;
    messageText: string;
  }): Promise<void> {
    await this.sendViaAPI('support_message', {
      userName: message.userName,
      userEmail: message.userEmail,
      anxietyLevel: message.anxietyLevel,
      messageText: message.messageText,
    });
  }
}
