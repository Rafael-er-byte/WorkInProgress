import type { Languages } from "../../../../../config/constants/AllowedLanguages";
import type User from "../../../../user/core/model/User";

export default interface iAppConfig{
    getLanguageConfig(user: User['id']): Promise<Languages>;
};