// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import duffel from '@/utils/duffel';
import { DuffelError } from '@duffel/api';

type Data = { name: string }

export default async function handler ( req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { query } = req;
        const queryParams = query.query;
        //console.log(queryParams);
        const list = await duffel.suggestions.list({
            "query": queryParams
        })
        //console.log(list);
        res.send({ airports: list });
      } catch (e: unknown) {
        if (e instanceof DuffelError) {
          res.status(e.meta.status).send({ errors: e.errors });
          return;
        }
        res.status(500).send(e);
      }
}




