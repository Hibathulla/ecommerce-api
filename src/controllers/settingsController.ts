import { Settings } from "../models/settingsModel";
import { CreateOne, GetOne, UpdateOne } from "./handlerFactory";

export const createSettingsDetail = CreateOne(Settings, "settings");
export const updateSettingsDetail = UpdateOne(Settings, "settings");
export const getSettingsDetail = GetOne(Settings, "settings");
