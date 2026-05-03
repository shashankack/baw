import { Box, Grid, Typography, Stack } from "@mui/material";
import CTAButton from "./CTAButton";

import clients from "@/data/clients.json";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import AnimatedCard from "./AnimatedCard";
import TestimonialSection from "./sections/TestimonialSection";
import ClientsAndServicesSection from "./sections/ClientsAndServicesSection";

const ThumbnailsGrid = ({
  data = clients,
  title = "Our Clients",
  cta = "Contact Us",
  link = "/contact",
}) => {
  return (
    <Box width="100%">
      {title && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={4}
        >
          <Typography variant="h6">{title}</Typography>
          <CTAButton
            text={cta}
            variant="text"
            component="a"
            href={link}
            endIcon={
              <ArrowUpwardRoundedIcon
                sx={{
                  transition: "transform 0.3s ease",
                  transform: "rotate(45deg)",
                }}
              />
            }
          />
        </Stack>
      )}
      <Grid container spacing={2} my={4} px={4}>
        {data.clients.map((item, index) => (
          <Grid size={{ xs: 6, md: 4 }} key={index}>
            <AnimatedCard
              client={item}
              index={index}
              imgSrc={item.media.thumbnail}
              href={`/works/${item.slug}`}
              direction="bottom"
              stagger={true}
            />
          </Grid>
        ))}
      </Grid>
      <ClientsAndServicesSection />
      <TestimonialSection />
    </Box>
  );
};

export default ThumbnailsGrid;
