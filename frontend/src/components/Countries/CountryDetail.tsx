import { useNavigate, useParams } from "react-router-dom";
import { Country } from "../../types/country";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from "../../store/slices/countriesSlice";
import { useEffect } from "react";
import CountryCard from "./CountryCard";
import { Box, Button } from "@mui/material";

interface CountryCardProps {
    country: Country;
}

const CountryDetail = () => {
  const {name} = useParams();
  const countries = useAppSelector(selectAllCountries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const selectedCountry = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent( name || '').toLowerCase());

  console.log(selectedCountry);
  console.log(selectedCountry?.name.common);

  const handleBackClick = () => {
    navigate('/countries');
  }

  useEffect(() => {
    if (!selectedCountry) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, selectedCountry]);

    return (
        <Box>
            <h1>Country Detail</h1>
            {selectedCountry?.name.common}
            <Button onClick={handleBackClick}/>
        </Box>
    )
}

export default CountryDetail;