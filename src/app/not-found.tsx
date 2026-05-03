import { Box, Stack, Typography, Button } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

export default function NotFound() {
  return (
    <Stack
      minHeight="100vh"
      pt={{ xs: 10, md: 14 }}
      pb={{ xs: 6, md: 8 }}
      px={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{
        borderBottom: "1px solid",
        borderColor: "primary.main",
        background:
          "radial-gradient(circle at 12% 18%, rgba(21, 99, 255, 0.09), rgba(252, 243, 227, 0) 34%), radial-gradient(circle at 84% 85%, rgba(21, 99, 255, 0.08), rgba(252, 243, 227, 0) 30%)",
      }}
    >
      <Stack
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(21, 99, 255, 0.08) 0, rgba(21, 99, 255, 0.08) 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, rgba(21, 99, 255, 0.08) 0, rgba(21, 99, 255, 0.08) 1px, transparent 1px, transparent 36px)",
          }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box
            flex={1}
            px={{ xs: 2, md: 4 }}
            py={{ xs: 4, md: 5 }}
            borderRight={{ xs: "none", md: "1px solid" }}
            borderBottom={{ xs: "1px solid", md: "none" }}
            borderColor="primary.main"
          >
            <Typography
              variant="body1"
              sx={{ letterSpacing: "0.1em", fontSize: { xs: "0.78rem", md: "0.9rem" } }}
            >
              ERROR / 404
            </Typography>
            <Typography
              variant="h1"
              sx={{
                mt: 1,
                fontSize: { xs: "1.7rem", md: "2.6rem" },
                lineHeight: 1.1,
                maxWidth: "16ch",
              }}
            >
              This page broke the mould and disappeared.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, maxWidth: "44ch", fontSize: { xs: "0.8rem", md: "0.9rem" } }}
            >
              The route you requested does not exist or has moved. Let&apos;s get
              you back to something worth looking at.
            </Typography>
          </Box>

          <Stack
            flex={1}
            justifyContent="space-between"
            px={{ xs: 2, md: 4 }}
            py={{ xs: 4, md: 5 }}
            gap={4}
          >
            <Typography
              sx={{
                fontFamily: "Geist Mono, monospace",
                fontSize: { xs: "17vw", md: "10vw" },
                lineHeight: 0.9,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              404
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} gap={1.2}>
              <Button variant="contained" component="a" href="/">
                Back Home
              </Button>
              <Button
                variant="text"
                component="a"
                href="/works"
                endIcon={
                  <ArrowUpwardRoundedIcon
                    sx={{ transform: "rotate(45deg)", transition: "transform 0.3s ease" }}
                  />
                }
              >
                View Works
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}