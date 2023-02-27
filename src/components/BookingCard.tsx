import React, { useState } from 'react';
import { Offer, Order } from '@duffel/api';
import { Card } from './Card';
import { formatCurrency, getAirlineLogoUrl } from '@/utils';
import { GENERIC_ERROR_MESSAGE } from '@/constants/error';

import styles from '@/styles/Booking.module.css'

interface BookingCardProps {
  offer: Offer;
  onSuccess(order: Order): void;
  onError(e: Error): void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  offer,
  onSuccess,
  onError,
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const bookOffer = async (item:any) => {
    setIsFetching(true);

    const res = await fetch(`/api/book`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        offerId: offer.id,
        passengers: [
         
        ],
        currency: offer.total_currency,
        amount: offer.total_amount,
      }),
    });

    const { order, errors } = await res.json();
    setIsFetching(false);
    if (Array.isArray(errors)) {
      onError(new Error(errors[0].title));
      return;
    }

    if (!order) {
      onError(new Error(GENERIC_ERROR_MESSAGE));
      return;
    }
    onSuccess(order);
  };

  console.log(offer);
  return (
    <div className={styles.page}>
    {
      offer.map((item:any, index:number) => (
        <Card.Root key={index} className={styles.card}>
          <Card.Content className={styles.content}>
            {offer && <img
              src={getAirlineLogoUrl(item?.owner?.iata_code)}
              alt={item?.owner?.name}
              width={24}
              height={24}
            /> }
            <Card.Text className={styles.airline}>{item?.owner?.name}</Card.Text>
            <Card.Text className="offer-currency" color="dark">
              {item && formatCurrency(item?.total_amount, item?.total_currency)}
            </Card.Text>
            <span className={styles.down}>
              <i className={styles.icon}></i>
            </span>
          </Card.Content>
          
        </Card.Root>
      ))
    }
  </div>
  )
};
