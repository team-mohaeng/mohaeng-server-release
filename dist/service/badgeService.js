"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Badge_1 = require("../models/Badge");
const errors_1 = require("../errors");
const Badge_2 = require("../dummy/Badge");
exports.default = {
    badge: async (userId) => {
        try {
            const user = await User_1.User.findOne({ attributes: ['id'], where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            //뱃지 하나로 합치기
            const badges = Badge_2.courseBadges.concat(Badge_2.challengeBadges, Badge_2.challengeCountBadges, Badge_2.feedBadges, Badge_2.stickerBadges);
            const badgeArray = new Array();
            const userBadges = await Badge_1.Badge.findAll({ attributes: ["id"], where: { user_id: userId } });
            //뱃지 id만 담는 배열
            let badgeIdArray = new Array();
            userBadges.forEach(badge => {
                badgeIdArray.push(badge.id);
            });
            if (!userBadges) {
                badges.forEach(badge => {
                    let badgeInfo = {
                        id: badge.getId(),
                        name: badge.getName(),
                        info: badge.getHowObtain(),
                        image: badge.getImageURL(),
                        hasBadge: false
                    };
                    badgeArray.push(badgeInfo);
                });
            }
            else {
                badges.forEach(badge => {
                    if (badgeIdArray.includes(badge.getId())) {
                        let badgeInfo = {
                            id: badge.getId(),
                            name: badge.getName(),
                            info: "",
                            image: badge.getImageURL(),
                            hasBadge: true
                        };
                        badgeArray.push(badgeInfo);
                    }
                    else {
                        let badgeInfo = {
                            id: badge.getId(),
                            name: badge.getName(),
                            info: badge.getHowObtain(),
                            image: badge.getImageURL(),
                            hasBadge: false
                        };
                        badgeArray.push(badgeInfo);
                    }
                });
            }
            User_1.User.update({ is_badge_new: false }, { where: { id: userId } });
            const badgeResponse = {
                badges: badgeArray
            };
            const responseDTO = {
                status: 200,
                data: badgeResponse
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=badgeService.js.map