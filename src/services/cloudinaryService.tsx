import { CreateUserDTO } from "../models/user/userInterface";
import http from "../http-common"

class CloudinaryService {

    async uploadProfilePic(formData: FormData) {
        return await (await http.post('https://api.cloudinary.com/v1_1/moonbaboon/upload', formData)).data.url;
    }

}
export default new CloudinaryService();