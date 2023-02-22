import React, { useState } from 'react';
import { Offer, Order } from '@duffel/api';
import { Card } from './Card';
import { formatCurrency, getAirlineLogoUrl } from '@/utils';
import { GENERIC_ERROR_MESSAGE } from '@/constants/error';

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

  const bookOffer = async () => {
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
  //console.log(offer);
  return (
      <Card.Root className="page block">
        <Card.Content>
          <img
            src={getAirlineLogoUrl(offer.owner.iata_code)}
            alt={offer.owner.name}
            width={24}
            height={24}
          />
          <Card.Text color="dark">{offer.owner.name}</Card.Text>
          <Card.Text className="offer-currency" color="dark">
            {formatCurrency(offer.total_amount, offer.total_currency)}
          </Card.Text>
        </Card.Content>
        <button
          disabled={isFetching}
          onClick={async () => await bookOffer()}
        >
        {isFetching ? 'Booking…' : 'Book'}
        </button>
      </Card.Root>
  );
};
