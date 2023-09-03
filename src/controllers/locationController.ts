import { Location } from "../models/locationModel";
import { CreateOne } from "./handlerFactory";

export const createLocation = CreateOne(Location, "location");
