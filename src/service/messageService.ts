import { SERVER_ERROR_MESSAGE } from '../constant';
import { notExistUser } from '../errors';
import { IFail } from '../interfaces/IFail';
import { User } from '../models/User';
import { Message } from '../models/Message';
import MessageResponseDTO, { UserMessageResponseDTO } from '../dto/Message/MessageResponseDTO'

export default {
  chatting: async (id: string) => {
    try {
      const user = await User.findOne({
        attributes: ['nickname'],
        where: { id: id }
      });
      const userId = Number(id);

      if (!user) {
        return notExistUser;
      }

      const messages = await Message.findAll({
        where: { user_id: id },
        order: ["date"]
      });

      // if (!messages || messages.length == 0) {
      //   const responseDTO: MessageResponseDTO = {
      //     status: 200,
      //     data: {
      //       messages: [],
      //     }
      //   };
      //   return responseDTO;
      // }

      let userMessageDTO: UserMessageResponseDTO[] = [];
      for (let i = 0; i < messages.length; i++) {
        const userMessage = messages[i];

        const ments = userMessage.ment.split("ㅡ");
        let mentList: string[] = [];
        for (let j = 0; j < ments.length; j++) {
          mentList.push(ments[j].replace(/ㅁㅁㅁ/gi, user.nickname));
        }

        userMessageDTO.push({
          date: userMessage.date,
          message: mentList,
          isNew: userMessage.is_new
        });
      }

      Message.update(
        { is_new: false },
        { where: { user_id: id } }
      );

      const responseDTO: MessageResponseDTO = {
        status: 200,
        data: {
          messages: userMessageDTO
        }
      };
      return responseDTO;

    } catch (err) {
      console.error(err.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  }
}