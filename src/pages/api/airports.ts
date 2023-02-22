// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import duffel from '@/utils/duffel';
import { DuffelError } from '@duffel/api';

type Data = { name: string }

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    try {
        // create an offer request for a flight departing tomorrow
        // retrieve the cheapest offer
        const list = await duffel.airports.list({
          limit:200
        })
        res.send({ airports: list });
    
      } catch (e: unknown) {
        if (e instanceof DuffelError) {
          res.status(e.meta.status).send({ errors: e.errors });
          return;
        }
        res.status(500).send(e);
      }
}




