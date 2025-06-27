import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
} from "@mui/material";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

interface MemberTableProps {
  members: MemberEntity[];
}

export const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Avatar</b></TableCell>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Avatar src={member.avatar_url} alt="avatar" />
              </TableCell>
              <TableCell>{member.id}</TableCell>
              <TableCell>
                <Link to={`/detail/${member.login}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                  {member.login}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
