import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import apiService from "../../services/api.service";
import React, { useEffect, useState } from "react";
import { CountryFull } from "../../ts/interfaces/country.interface";
import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CountryCard from "./components/CountryCard";
import { LineChart } from "@mui/x-charts";

export default function CountryPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { countryCode } = useParams<{ countryCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<CountryFull | null>(null);
  const [series, setSeries] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!countryCode) {
        return;
      }

      const { data } = await apiService.public.getCountry(
        countryCode.toUpperCase(),
      );

      const populationCounts = data.populationCounts.sort(
        (a, b) => a.year - b.year,
      );

      const series: number[] = [];
      const years: number[] = [];

      populationCounts.forEach(({ year, value }) => {
        series.push(value);
        years.push(year);
      });

      setCountry(data);
      setSeries(series);
      setYears(years);
      setIsLoading(false);
    }

    fetchData();
  }, [countryCode]);

  return (
    <Layout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "8px",
            justifyContent: { sm: "space-between" },
            flexDirection: { sm: "row-reverse" },
          }}
        >
          <Grid
            item
            width={{ xs: "100%", md: "400px" }}
            style={{ paddingTop: "0px" }}
          >
            <CountryCard
              name={country?.commonName || ""}
              flagUrl={country?.flag || ""}
              officialName={country?.officialName || ""}
              region={country?.region || ""}
              countryCode={country?.countryCode || ""}
              borders={country?.borders || []}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8} style={{ paddingTop: "0px" }}>
            <h1 style={{ margin: "8px 0", paddingLeft: "8px" }}>
              {country?.commonName} population:
            </h1>
            <Box
              sx={{
                display: "flex  ",
                width: "100%",
                height: isSmallScreen ? 300 : 500,
              }}
            >
              <LineChart
                series={[{ data: series, area: true }]}
                margin={{
                  left: 100,
                }}
                xAxis={[
                  {
                    dataKey: "year",
                    valueFormatter: (value) => value.toString(),
                    data: years,
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
