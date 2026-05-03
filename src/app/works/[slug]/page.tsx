import { Box, Typography, Stack } from "@mui/material";
import { clients } from "@/data/clients.json";
import WorksDetailContent from "@/components/works/WorksDetailContent";

const findClientBySlug = (slug: string) => {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  return clients.find(
    (client) => client.slug.trim().toLowerCase() === normalizedSlug,
  );
};

const WorksDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const client = findClientBySlug(slug);

  if (!client) {
    return (
      <Box py={10}>
        <Stack>
          <Typography>Work not found.</Typography>
        </Stack>
      </Box>
    );
  }

  return <WorksDetailContent client={client} />;
};

export default WorksDetailPage;
