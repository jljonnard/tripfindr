/* eslint-disable import/no-anonymous-default-export */
import { getObject } from "../utilities/format";
import { getRange, getDayNumber, getCalendarDay } from "../utilities/dates";

export default (state = null, action) => {
    switch (action.type) {
        case "FETCH_FLIGHTS":
            return action.payload.fr.data.Quotes.map((quote, id) => ({
                index: id,
                price: quote.MinPrice,
                direct: quote.Direct,
                frenchCityName: getObject(
                    quote.OutboundLeg.DestinationId,
                    action.payload.fr.data.Places,
                    "PlaceId",
                    "CityName"
                ),
                get englishCityName() {
                    return action.payload.en.data.Quotes.length ===
                        action.payload.fr.data.Quotes.length
                        ? getObject(
                              action.payload.en.data.Quotes[id].OutboundLeg.DestinationId,
                              action.payload.en.data.Places,
                              "PlaceId",
                              "CityName"
                          )
                        : this.frenchCityName;
                },
                country: getObject(
                    quote.OutboundLeg.DestinationId,
                    action.payload.fr.data.Places,
                    "PlaceId",
                    "CountryName"
                ),
                originAirport: action.payload.fields.origin.slice(0, 3),
                outboundLegAirport: getObject(
                    quote.OutboundLeg.DestinationId,
                    action.payload.fr.data.Places,
                    "PlaceId",
                    "IataCode"
                ),
                inboundLegAirport: getObject(
                    quote.InboundLeg.OriginId,
                    action.payload.fr.data.Places,
                    "PlaceId",
                    "IataCode"
                ),
                outboundLegCarrier: getObject(
                    quote.OutboundLeg.CarrierIds[0],
                    action.payload.fr.data.Carriers,
                    "CarrierId",
                    "Name"
                ),
                inboundLegCarrier: getObject(
                    quote.InboundLeg.CarrierIds[0],
                    action.payload.fr.data.Carriers,
                    "CarrierId",
                    "Name"
                ),
                outboundLegDay: getCalendarDay(quote.OutboundLeg.DepartureDate.slice(0, 10)),
                inboundLegDay: getCalendarDay(quote.InboundLeg.DepartureDate.slice(0, 10)),
                outboundLegDate:
                    quote.OutboundLeg.DepartureDate.slice(8, 10) +
                    "/" +
                    quote.OutboundLeg.DepartureDate.slice(5, 7),
                inboundLegDate:
                    quote.InboundLeg.DepartureDate.slice(8, 10) +
                    "/" +
                    quote.InboundLeg.DepartureDate.slice(5, 7),
                get link() {
                    return (
                        "https://www.kayak.fr/flights/" +
                        this.originAirport +
                        "-" +
                        this.outboundLegAirport +
                        "/" +
                        quote.OutboundLeg.DepartureDate.slice(0, 10) +
                        "/" +
                        quote.InboundLeg.DepartureDate.slice(0, 10)
                    );
                },
            }))
                .filter(
                    (flight) =>
                        !(
                            action.payload.fields.direct &&
                            flight.direct !== action.payload.fields.direct
                        )
                )
                .filter((flight) => !(action.payload.fields.minPrice > flight.price))
                .filter((flight) => !(action.payload.fields.maxPrice < flight.price))
                .filter(
                    (flight) =>
                        !(
                            action.payload.fields.range[0] !== 0 &&
                            (action.payload.fields.range[0] === 2
                                ? !(
                                      getRange(flight.outboundLegDate, flight.inboundLegDate) <
                                          5 &&
                                      [5, 6].includes(getDayNumber(flight.outboundLegDate)) &&
                                      [0, 1].includes(getDayNumber(flight.inboundLegDate))
                                  )
                                : !action.payload.fields.range.includes(
                                      getRange(flight.outboundLegDate, flight.inboundLegDate)
                                  ))
                        )
                );
        default:
            return state;
    }
};
