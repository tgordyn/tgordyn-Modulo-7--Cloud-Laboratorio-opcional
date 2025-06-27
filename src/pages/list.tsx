import React from "react";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import { SearchBar } from "../components/SearchBar";
import { MemberTable } from "../components/MemberTable";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setOrganization] = React.useState<string>(
    sessionStorage.getItem("organization") || "lemoncode"
  );
  const [page, setPage] = React.useState<number>(1);
  const perPage = 10; // Número de miembros por página

  const fetchMembers = () => {
    fetch(
      `https://api.github.com/orgs/${organization}/members?per_page=${perPage}&page=${page}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setMembers(json);
        } else {
          setMembers([]);
        }
        sessionStorage.setItem("organization", organization);
      })
      .catch(() => {
        alert("Error al buscar organización");
        setMembers([]);
      });
  };

  React.useEffect(() => {
    fetchMembers();
  }, [organization, page]);

  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Organization Members
        </Typography>

        <SearchBar
          organization={organization}
          setOrganization={setOrganization}
          fetchMembers={() => {
            setPage(1);
            fetchMembers();
          }}
        />
        <MemberTable members={members} />
        <Pagination
          count={10}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        />
      </CardContent>
    </Card>
  );
};
