import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
}

const createDefaultMemberDetail = (): MemberDetailEntity => ({
  id: "",
  login: "",
  name: "",
  company: "",
  bio: "",
});

export const DetailPage: React.FC = () => {
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setMember(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          User Detail
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6">
              <b>User ID:</b> {id}
            </Typography>
            <Typography variant="body1"><b>ID:</b> {member.id}</Typography>
            <Typography variant="body1"><b>Login:</b> {member.login}</Typography>
            <Typography variant="body1"><b>Name:</b> {member.name || "N/A"}</Typography>
            <Typography variant="body1"><b>Company:</b> {member.company || "N/A"}</Typography>
            <Typography variant="body1"><b>Bio:</b> {member.bio || "No bio available"}</Typography>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          component={Link}
          to="/list"
        >
          Back to List
        </Button>
      </CardContent>
    </Card>
    </Box>
  );
};
