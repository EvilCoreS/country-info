import React, { useEffect, useState } from "react";
import { Country } from "../../ts/interfaces/country.interface";
import apiService from "../../services/api.service";
import Layout from "../../components/Layout";
import { CircularProgress, Grid, Link } from "@mui/material";

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async function () {
    const { data } = await apiService.public.getCountries();

    setCountries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 style={{ margin: "8px 0", paddingLeft: "8px" }}>
        List of countries:
      </h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {countries.length
            ? countries.map(({ name, countryCode }, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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
                      {name}
                    </div>
                  </Link>
                </Grid>
              ))
            : ""}
        </Grid>
      )}
    </Layout>
  );
}
