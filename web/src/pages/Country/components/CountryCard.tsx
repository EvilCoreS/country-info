import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { NestedCountry } from "../../../ts/interfaces/country.interface";
import React from "react";

interface Props {
  name: string;
  flagUrl: string;
  officialName: string;
  region: string;
  countryCode: string;
  borders: NestedCountry[];
}

export default function CountryCard({
  name,
  flagUrl,
  officialName,
  region,
  countryCode,
  borders,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Divider />
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "8px" }}
        >
          <Box
            height={200}
            width={350}
            component="img"
            src={flagUrl}
            alt={`Flag of ${name}`}
            sx={{
              borderWidth: "1px",
              borderColor: "black",
              borderStyle: "solid",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Typography gutterBottom marginTop="4px" textAlign="center">
          Flag of {name}
        </Typography>
        <Divider />
        <Typography marginTop="8px">Official name: {officialName}</Typography>
        <Typography marginTop="8px">Region: {region}</Typography>
        <Typography gutterBottom marginTop="8px">
          Country code: {countryCode}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {borders.length ? (
          <Typography gutterBottom textAlign="center">
            Borders:
          </Typography>
        ) : (
          ""
        )}
        <Grid container spacing={1}>
          {borders.length
            ? borders.map(({ commonName, countryCode }) => (
                <Grid item xs={6} key={countryCode}>
                  <Link sx={{ display: "block" }} href={`/${countryCode}`}>
                    <div
                      style={{
                        padding: "16px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {commonName}
                    </div>
                  </Link>
                </Grid>
              ))
            : ""}
        </Grid>
      </CardActions>
    </Card>
  );
}
