import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const authors = [
  { name: 'Remy Sharp' },
  { name: 'Travis Howard' },
];

const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
    authors: [{ name: 'Erica Johns' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Product',
    title: 'Innovative product features that drive success',
    description:
      'Explore the product features that are setting new standards in the industry. Learn how these advancements are helping businesses achieve unprecedented growth.',
    authors: [{ name: 'Kate Morrison' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Design',
    title: 'Designing for the future: trends and insights',
    description:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating user experiences that captivate and engage.',
    authors: [{ name: 'Cindy Baker' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Company',
    title: 'Our company culture: fostering innovation and growth',
    description:
      'Learn about the culture that drives our success. Discover how we foster innovation, encourage creativity, and support the growth of our team members.',
    authors: [
      { name: 'Agnes Walker' },
      { name: 'Trevor Henderson' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Engineering the future: our vision and roadmap',
    description:
      'Get an inside look at our engineering vision and the roadmap that guides our development. See how we are building the technologies of tomorrow.',
    authors: [{ name: 'Travis Howard' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Product',
    title: 'Product management best practices for success',
    description:
      'Discover the best practices in product management that lead to successful product launches. Our product team shares insights from their experience.',
    authors: [
      { name: 'Agnes Walker' },
      { name: 'Trevor Henderson' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=7',
    tag: 'Design',
    title: 'The art of user interface design',
    description:
      'Dive into the art of user interface design with our expert designers. Learn the principles and techniques that create intuitive and beautiful user interfaces.',
    authors: [{ name: 'Travis Howard' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=8',
    tag: 'Company',
    title: 'Sustainability initiatives: our commitment to the planet',
    description:
      'Read about our sustainability initiatives and our commitment to environmental responsibility. Learn how we are making a positive impact on the planet.',
    authors: [{ name: 'Kate Morrison' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=9',
    tag: 'Engineering',
    title: 'The future of artificial intelligence in our products',
    description:
      'Explore how artificial intelligence is being integrated into our products. Discover the exciting possibilities and the future of AI in our industry.',
    authors: [{ name: 'Cindy Baker' }],
  },
];

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

function Author({ authors }: { authors: { name: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {cardData.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>

              <Author authors={article.authors} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
      </Box>
    </div>
  );
}
