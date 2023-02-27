import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Select } from '@/controls/Select'
import { Offer } from '@duffel/api';
import { GENERIC_ERROR_MESSAGE } from '@/constants/error';
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment'


import {useRouter} from "next/router";


interface SearchCardProps {
  beforeSearch(): void;
  onSuccess(offer: Offer): void;
  onError(e: Error): void;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  beforeSearch,
  onSuccess,
  onError,
}) => {

  
  //const { query } = useRouter();

  const router = useRouter()



  const [sort, setSort] = useState<'total_amount' | 'total_duration'>(
    'total_duration'
  );
  const [airportsOrigin, setAirportsOrigin] = useState([]);

  const [airportsDest, setAirportsDest] = useState([]);

  const [origin, setOrigin] = useState('');
  const [originLable, setOriginLable] = useState("Flying from");
  
  const [openOrigin, setOpenOrigin ]= useState(false);
  const [destination, setDestination] = useState('');

  const [destLable, setDestLable] = useState("Flying from");
  const [openDest, setOpenDest ]= useState(false);
  
  const [isFetching, setIsFetching] = useState(false);
  const [trip, setTrip] = useState('round')
  const [showCal, setShowCal] = useState(false)
  const [startDate,setStartDate] = useState(new Date())
  const [endDate,setEndDate] = useState(new Date())

  const [selected, setSelected] = useState(0) 
  const fetchOffers = async () => {
    router.push({
      pathname: '/search',
      query: { 
        origin: origin , 
        destination : destination,
        startDate: startDate,
        endDate: endDate 
      },
    })
  };


  const getAirports = async (query:string, control:number) => {
    try {
      if(control == 1){
        setOrigin(query)
      }else{
        setDestination(query)
      }

      if(query.length > 2){
        const res = await fetch(`/api/suggestions?query=${query}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const { airports, errors } = await res.json();
        if(control == 1){
          
          setAirportsOrigin(airports.data.map((item:any) => {
            return { value:item.iata_code ,label:item.name}
          }))
          setOpenOrigin(true);
        }
        else{
          setAirportsDest(airports.data.map((item:any) => {
            return { value:item.iata_code ,label:item.name}
          }))
          setOpenDest(true);
        }
      }
    } catch (e) {
      onError(e instanceof Error ? e : new Error(GENERIC_ERROR_MESSAGE));
    }
  }


  const handleCalender = (date:any) => {
    if(trip == 'round'){
      setStartDate(date.selection.startDate)
      setEndDate(date.selection.endDate)
    }
    else
      setStartDate(date);
    setShowCal(!showCal);
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const openCal = (step:number) => {
    setSelected(step);
    setShowCal(true);
  }
  
  const setOrigin1 = (d:any ) => {
    setOrigin(d.value);
    setOriginLable(d.lable)
    setOpenOrigin(false);
  }
  const setDestination1 = (d:any ) => {
    setDestination(d.value);
    setDestLable(d.lable)
    setOpenDest(false);
  }
  
  return ( 
    <>
      <Card.Root className="card">
        <Card.Header>
          <ul>
            <li onClick={()=>setTrip('round')} className={trip=='round' ? 'active' : ''}>Round-trip</li>
            <li onClick={()=>setTrip('oneway')} className={trip=='oneway' ? 'active' : ''}>One-way</li>
            <li>Economy</li>
            <li>Guests</li>
          </ul>
        </Card.Header>
        <Card.Content>
          <div onClick={()=> setSelected(1)} className={selected == 1 ? "item item-active" : "item"}>
            <Select
              onSelectCustom={setOrigin1}
              onChangeCustom={(query:string) => getAirports(query,1)}
              items={airportsOrigin}
              isOpen={openOrigin}
              selectedItem={origin}
              lable={originLable}
              tagline="Where do you want to fly from?"
              className="ml10"
            />
          </div>
          <div onClick={()=> setSelected(2)} className={selected == 2 ? "item item-active" : "item"}>
            <Select
              onSelectCustom={(data: string)=>setDestination1(data)}
              onChangeCustom={(query:string) => getAirports(query,2)}
              defaultValue={destination}
              items={airportsDest}
              isOpen={openDest}
              tagline="Where you want to fly to?"
              lable={destLable}
              className="ml20"
            />
          </div>
          <div onClick={()=> openCal(3)} className={selected == 3 ? "item item-active" : "item"}>
            <div className="airport">
              <div className="airporticon text-neutral-300 dark:text-neutral-400">
                <img src="/calendar.svg" />
              </div>


              <div className="airportselect">
                <span className="big-text">{ startDate ? moment(startDate).format("DD/MM/YYYY") : 'Pick Up' } </span>
                <span className="light-text">Add Date</span>
              </div>

            </div>
            {
              showCal && 
              <div className="callender"> 
                {
                  trip=='oneway'
                  ?
                    <Calendar
                      date={startDate}
                      onChange={handleCalender}
                    />
                  :
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleCalender}
                    />
                }
              </div>
            }
          </div>
          {
            trip=='round'
            ?
            <div onClick={()=> openCal(4)} className={selected == 4 ? "item item-active" : "item"}>
              <div className="airport">
              
                <div className="airporticon text-neutral-300 dark:text-neutral-400">
                  <img src="/calendar.svg" />
                </div>
                <div className="airportselect">
                  <span className="big-text">{ endDate ? moment(endDate).format("DD/MM/YYYY") : 'Drop off' } </span>
                  <span className="light-text">Add Date</span>
                </div>
              </div>
            </div>
          : 
            null
          }
          <button onClick={fetchOffers} disabled={isFetching} className="search_btn">
            {
              isFetching ? 
              '…'
              : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            
            }
          </button>
        </Card.Content>
      </Card.Root>
    </>
  );
};
