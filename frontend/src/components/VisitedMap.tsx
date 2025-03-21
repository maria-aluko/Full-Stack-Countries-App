import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Box, Typography } from "@mui/material";

const geoUrl = "/custom.geo.json";

type VisitedMapProps = {
  visitedCountries: string[];
};

const VisitedMap = ({ visitedCountries }: VisitedMapProps) => {
  return (
    <Box sx={{ mt: 5 }}>
      <ComposableMap
        projectionConfig={{ scale: 160 }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties.iso_a3?.toUpperCase();
              const isVisited = visitedCountries.includes(countryCode);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isVisited ? "#1976d2" : "#EAEAEC"}
                  stroke="#D6D6DA"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#42a5f5", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default VisitedMap;
