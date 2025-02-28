import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAllCountries } from "../../store/slices/countriesSlice";
import { Button, Typography } from "@mui/material";

const CountryCard = () => {
  const countries = useAppSelector(selectAllCountries);
  const navigate = useNavigate();
  const {name} = useParams();
  const selectedCountry = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent( name || '').toLowerCase());

  const handleCountryClick = () => {
    navigate(`/countries/:${selectedCountry?.name.common}`);
  }

  return (
    <div>
      <ul>
        <li>
          {countries.map((country) => (
            <div className="country-card">
              <img src={country.flags.png} alt={country.name.common} />
              <h3>{country.name.common}</h3>
              <p>{country.region}</p>
              <p>{country.capital}</p>
              <Typography>{country.population}</Typography>
              <Button 
                onClick={handleCountryClick}
              >
                See More
              </Button>
            </div>
            ))
          }
        </li>
      </ul>
      
    </div>
  )
}

export default CountryCard;