import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useAuth } from '@/lib/auth.js'
import { FeedQuery } from '@/graphql/Queries'
const inter = Inter({ subsets: ['latin'] })

import { GENERIC_ERROR_MESSAGE } from '@/constants/error';


import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { SearchCard } from '@/components/SearchCard';
import { BookingCard } from '@/components/BookingCard'; 

import { Offer, Order } from '@duffel/api';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


import {useRouter} from "next/router";



export default function Search () {
  const { query } = useRouter();
  const [sort, setSort] = useState<'total_amount' | 'total_duration'> ('total_duration');
  const [isFetching, setIsFetching] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const [offer, setOffer] = useState(null);
  const [order, setOrder] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [returnOffers, setReturnOffers] = useState(false);
  const [stops, setStops] = useState(0);
  const [trevelClass, setTrevelClass] = useState('economy');
  
  
  const hasOffer = offer && typeof offer === 'object' && !(offer instanceof Error);
  const hasOrder = order && typeof order === 'object' && !(order instanceof Error);



  
  const fetchOffers = async () => {
    setOffer(null);
    setIsFetching(true);
    try {

      if(origin && destination) {
        const res = await fetch('/api/search', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origin,
            destination,
            departureDate, 
            arrivalDate, 
            returnOffers, 
            stops, 
            trevelClass, 
            sort
          }),
        });

        const { offer, errors } = await res.json();

        if (errors) {
          new Error(
              Array.isArray(errors) ? errors[0].title : GENERIC_ERROR_MESSAGE
          );
          return;
        }

        if (!offer) {
          new Error(GENERIC_ERROR_MESSAGE);
          return;
        }

        setOffer(offer);
      }
    } catch (e) {
      e instanceof Error ? e : new Error(GENERIC_ERROR_MESSAGE);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    setOrigin(query.origin);
    setDestination(query.destination);
  },)

  useEffect(() => {
    setOrigin(query.origin);
    setDestination(query.destination);
    fetchOffers()
  }, [origin,destination])



  console.log(offer);
  return (
    <>
      <Head>
        <title>Flight search</title>
        <meta name="description" content="Sreach for your flight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="page">
          <Header />
          {hasOffer && !hasOrder && (
              <BookingCard
                offer={offer}
                onSuccess={(order:any) => setOffer(offer)}
               
              />
            )}
        </div>
    </>
  )
}
