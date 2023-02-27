// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import duffel from '@/utils/duffel';
import { DuffelError } from '@duffel/api';

type Data = { name: string }

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

 
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const { origin, destination, departureDate, arrivalDate, returnOffers, stops, trevelClass, sort } = req.body;

        //console.log(req.body);

        if (!origin || !destination) {
          res.sendStatus(422);
          return;
        }

        try {


              /*private_fares: {
                QF: [
                  {
                    corporate_code: "FLX53",
                    tracking_reference: "ABN:2345678"
                  }
                ],
                UA: [
                  {
                    corporate_code: "1234",
                    tour_code: "578DFL"
                  }
                ]
              },*/


            // create an offer request for a flight departing tomorrow
            const offerRequestsResponse = await duffel.offerRequests.create({
              slices: [
                {
                  origin: origin,
                  destination:destination,
                  departureDate: departureDate? departureDate : "2023-03-20T06:30:00.000Z"},
                
                {
                  origin: destination,
                  destination: origin,
                  departureDate: arrivalDate ? arrivalDate : "2023-04-30T06:30:00.000Z"
                }
              ],
              passengers:[
                {
                  type:"adult",
                  loyaltyProgrammeAccounts:[],
                  givenName:"",
                  familyName:""
                }
              ],
              return_offers: returnOffers?true:false,
              max_connections: stops ? stops : 2,
              cabin_class: trevelClass ? trevelClass : "economy"
            });


            // retrieve the cheapest offer
            const offersResponse = await duffel.offers.list({
              offer_request_id: offerRequestsResponse.data.id,
              sort,
              limit: 10,
            });
            res.send({
              offer: offersResponse.data,
            });
          } catch (e: unknown) {
            console.error(e);
            if (e instanceof DuffelError) {
              res.status(e.meta.status).send({ errors: e.errors });
              return;
            }
            res.status(500).send(e);
          }
}


