export const formatCurrency = (value: string, currency: string) => {

  //console.log(value,currency);
    if(currency && value)
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency,
      }).format(+value);

  };
  
  export const getAirlineLogoUrl = (iataCode: string) => `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iataCode}.svg`;
  