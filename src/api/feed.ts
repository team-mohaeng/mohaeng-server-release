import express from "express";
import { CreateFeedRequestDTO } from "../dto/Feed/Create/request/CreateFeedRequestDTO";
import { AddEmojiRequestDTO } from "../dto/Feed/Emoji/request/AddEmojiRequestDTO";
import { DeleteEmojiRequestDTO } from "../dto/Feed/Emoji/request/DeleteEmojiRequestDTO";
import feedService from "../service/feedService";
import auth from "../middleware/auth";
import upload from "../modules/upload";

const router = express.Router();

/**
 * @api {post} /api/feed 안부 작성
 * 
 * @apiVersion 1.0.0
 * @apiName createFeed
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiParamExample {form-data} Request-Example:
 * KEY, VALUE, CONTENT TYPE
 * feed(Text), {"content": "엄마 나 모행 다녀올게", "mood": 2, "isPrivate": false}, application/json
 * 
 * KEY, VALUE
 * image(File), "imageURL"
 * 
 * 사진참고
 * https://mohaeng.s3.ap-northeast-2.amazonaws.com/%EC%A0%9C%EB%AA%A9+%EC%97%86%EC%9D%8C.png
 *
 * @apiSuccess {Number} happy
 * @apiSuccess {Number} userHappy
 * @apiSuccess {Number} totalHappy
 * @apiSuccess {Boolean} isPenalty
 * @apiSuccess {Object} levelUp 포함 속성은 하단 참고
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "happy": 15, 
 *    "userHappy": 15,
 *    "totalHappy": 65,
 *    "isPenalty": false
 *    "levelUp": { //레벨업 하지 않을 경우에는 null
 *      "level": 10,
 *      "characterType": 1,
 *      "characterCard": {
 *        "id": 3,
 *        "image": "imageUrl"
 *      }
 *    }
 *  }
 * }
 * /////////////////////////////////////////여기까지 했는데 리스폰스 한 번만 더 확인해봐!
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 412 닉네임 글자 제한
 * {
 *  "status": 412,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 * 
 * @apiErrorExample Error-Response:
 * 412 닉네임 중복
 * {
 *  "status": 412,
 *  "message": "이미 사용 중인 닉네임입니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 412 이전과 같은 닉네임
 * {
 *  "status": 412,
 *  "message": "기존 닉네임과 다른 닉네임으로 설정해주세요."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
router.post("/", upload.single('image'), auth, async (req, res) => {
  let image;
  if ((req as any).file) {
    image = (req as any).file.location;
  }
  else {
    image = ""
  }
  const feedParams = JSON.parse(req.body.feed);
  const { mood, content, isPrivate } = feedParams;
  const requestDTO: CreateFeedRequestDTO = {
    mood: mood,
    content: content,
    image: image,
    isPrivate: isPrivate
  }
  const result = await feedService.create(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
})

router.delete("/:id", auth, async (req, res) => {
  const result = await feedService.delete(req.body.user.id, req.params.id);
  res.status(result.status).json(result);
})

router.put("/emoji/:id", auth, async (req, res) => {
  const { emojiId } = req.body;
  const requestDTO: AddEmojiRequestDTO = {
    emojiId: emojiId
  }
  const result = await feedService.emoji(req.body.user.id, req.params.id, requestDTO);
  res.status(result.status).json(result);
})

router.delete("/emoji/:id", auth, async (req, res) => {
  const { emojiId } = req.body;
  const requestDTO: DeleteEmojiRequestDTO = {
    emojiId: emojiId
  }
  const result = await feedService.deleteEmoji(req.body.user.id, req.params.id, requestDTO);
  res.status(result.status).json(result);
})

router.get("/:year/:month", auth, async (req, res) => {
  const result = await feedService.myFeed(req.body.user.id, req.params.year, req.params.month);
  res.status(result.status).json(result);
})

router.get("/", auth, async (req, res) => {
  const result = await feedService.feed(req.body.user.id);
  res.status(result.status).json(result);
})

module.exports = router;