// Service for sending Telegram notifications
// Note: In production, this should use Supabase Edge Function for security
// to avoid exposing the bot token in client-side code

const TELEGRAM_BOT_TOKEN = '8098211455:AAHgn_Tnl23c5Vr2AE2c1GuhuyUXKgj27N4';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Admin chat ID - should be set via environment variable or Supabase config
// For now, you need to get your chat ID by sending a message to the bot
// and checking: https://api.telegram.org/bot{TOKEN}/getUpdates
const ADMIN_CHAT_ID = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID || '';

interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

export class TelegramService {
  /**
   * Send a message to Telegram
   * @param chatId - Telegram chat ID (user or group)
   * @param text - Message text
   * @param parseMode - Optional parse mode (HTML, Markdown, etc.)
   */
  static async sendMessage(
    chatId: string | number,
    text: string,
    parseMode: 'HTML' | 'Markdown' | 'MarkdownV2' = 'HTML'
  ): Promise<{ success: boolean; error?: string }> {
    if (!chatId) {
      console.warn('Telegram chat ID not configured');
      return { success: false, error: 'Chat ID not configured' };
    }

    try {
      const message: TelegramMessage = {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      };

      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        console.error('Telegram API error:', data);
        return { success: false, error: data.description || 'Failed to send message' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
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
    if (!ADMIN_CHAT_ID) {
      console.warn('Admin chat ID not configured, skipping Telegram notification');
      return;
    }

    const message = `
🆕 <b>New User Registered</b>

👤 <b>Name:</b> ${user.name || 'Not provided'}
📧 <b>Email:</b> ${user.email || 'Not provided'}
📱 <b>Phone:</b> ${user.phone || 'Not provided'}
😰 <b>Anxiety Level:</b> ${user.anxietyLevel ? `${user.anxietyLevel}/5` : 'Not set'}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
    `.trim();

    await this.sendMessage(ADMIN_CHAT_ID, message, 'HTML');
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
    if (!ADMIN_CHAT_ID) {
      console.warn('Admin chat ID not configured, skipping Telegram notification');
      return;
    }

    const lessonTypeEmoji = booking.type === 'theory' ? '📚' : '🚗';
    const lessonTypeText = booking.type === 'theory' ? 'Theory' : 'Practice';

    const message = `
📅 <b>New Lesson Booking</b>

👤 <b>Student:</b> ${booking.userName || 'Not provided'}
📧 <b>Email:</b> ${booking.userEmail || 'Not provided'}
👨‍🏫 <b>Instructor:</b> ${booking.instructorName}
${lessonTypeEmoji} <b>Type:</b> ${lessonTypeText}
📆 <b>Date:</b> ${booking.date}
🕐 <b>Time:</b> ${booking.time}

⏰ <b>Booked at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
    `.trim();

    await this.sendMessage(ADMIN_CHAT_ID, message, 'HTML');
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
    if (!ADMIN_CHAT_ID) {
      console.warn('Admin chat ID not configured, skipping Telegram notification');
      return;
    }

    const anxietyEmoji = message.anxietyLevel
      ? message.anxietyLevel >= 4
        ? '🔴'
        : message.anxietyLevel >= 3
        ? '🟡'
        : '🟢'
      : '⚪';

    const messageText = message.messageText.length > 500
      ? message.messageText.substring(0, 500) + '...'
      : message.messageText;

    const telegramMessage = `
💬 <b>New Support Request</b>

👤 <b>Student:</b> ${message.userName || 'Not provided'}
📧 <b>Email:</b> ${message.userEmail || 'Not provided'}
${anxietyEmoji} <b>Anxiety Level:</b> ${message.anxietyLevel ? `${message.anxietyLevel}/5` : 'Not set'}

💭 <b>Message:</b>
${messageText}

⏰ <b>Sent at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
    `.trim();

    await this.sendMessage(ADMIN_CHAT_ID, telegramMessage, 'HTML');
  }
}
