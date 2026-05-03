import { Box, Typography, Stack } from "@mui/material";
import ThumbnailsGrid from "@/components/ThumbnailsGrid";

const WorksPage = () => {
  return (
    <Stack minHeight="100vh">
      {/* Up */}
      <Stack direction={{ xs: "column", md: "row" }} mt={14} px={4} py={2}>
        <Box flex={1}>
          <Typography variant="h6">What we do:</Typography>
        </Box>
        <Box flex={2}>
          <Typography
            variant="h1"
            sx={{
              lineHeight: 1,
              fontWeight: 600,
              fontSize: { xs: "2.4rem", md: "3.8rem" },
            }}
          >
            Bold brands, striking <br />
            creative and smart <br />
            digital design.
          </Typography>
        </Box>
      </Stack>
      <Box my={2} flex={1}>
        <ThumbnailsGrid title="Work - Highlights"  />
      </Box>
    </Stack>
  );
};

export default WorksPage;
