import { User } from "../models/User";
import { Badge } from "../models/Badge";
import { notExistUser, serverError } from "../errors";
import { courseBadges, challengeBadges, challengeCountBadges, feedBadges, stickerBadges } from "../dummy/Badge";
import { GetBadgeResponseDTO, BadgeResponseDTO, BadgeDTO } from "../dto/Badge/getBadgeResponseDTO";

export default {
  badge: async (userId: string) => {
    try {
      const user = await User.findOne({ attributes: ['id'], where: { id: userId }});
      if (!user) {
        return notExistUser;
      }
      
      //뱃지 하나로 합치기
      const badges = courseBadges.concat(challengeBadges, challengeCountBadges, feedBadges, stickerBadges)

      const badgeArray: Array<BadgeDTO> = new Array<BadgeDTO>();
      const userBadges = await Badge.findAll({ attributes: ["id"], where: { user_id: userId }});

      //뱃지 id만 담는 배열
      let badgeIdArray: Array<Number> = new Array<Number>();
      userBadges.forEach(badge => {
        badgeIdArray.push(badge.id);
      });

      if(!userBadges) {
        badges.forEach(badge => {
          let badgeInfo: BadgeDTO = {
            id: badge.getId(),
            name: badge.getName(),
            info: badge.getHowObtain(),
            image: badge.getImageURL(),
            hasBadge: false
          }
          badgeArray.push(badgeInfo);
        });
      }

      else {
        badges.forEach(badge => {
          if (badgeIdArray.includes(badge.getId())) {
            let badgeInfo: BadgeDTO = {
              id: badge.getId(),
              name: badge.getName(),
              info: "",
              image: badge.getImageURL(),
              hasBadge: true
            }
            badgeArray.push(badgeInfo);
          }

          else {
            let badgeInfo: BadgeDTO = {
              id: badge.getId(),
              name: badge.getName(),
              info: badge.getHowObtain(),
              image: null,
              hasBadge: false
            }
            badgeArray.push(badgeInfo);
          }
        });
      }

      User.update({ is_badge_new: false}, { where: { id: userId }});

      const badgeResponse: BadgeResponseDTO = {
        badges: badgeArray
      }

      const responseDTO: GetBadgeResponseDTO = {
        status: 200,
        data: badgeResponse
      }
      return responseDTO;
    }

    catch (err) {
      console.error(err);
      return serverError;
    }
  }
}