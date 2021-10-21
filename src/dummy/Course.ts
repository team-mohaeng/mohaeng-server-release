import { Course } from "../class/Course";
import { Challenge } from "../class/Challenge";


//1: 건강행
//2: 케어행
//3: 지켜야행
//4: 일탈행
//5: 추억행
//6: 사랑행
//7: 똑똑행

export const courses = [
  new Course(1, 6, "거침없이 하이킥", "거침없이 하이킥 설명", 7, 20, [
    new Challenge(1, "꽃 사진 찍어 보내기", "길가에 예쁜 꽃 많이 핀 거 봤어?! 어떤 꽃이든 좋으니까 부모님께 사진 찍어서 보내줄까? 셀카는 반칙!", "꽃 엄청 예쁘다.. 꽃 이름이 뭐야? 길가다 예쁜 꽃이 있으면 종종 부모님께 보내보는거 어때?", 20),
    new Challenge(2, "손편지 써주기", "손편지로 마음을 전해 본 지 오래지? 부끄럽지만 우리 종종 이렇게 마음을 전해볼까?", "편지 써 드리니까 너무 좋아하시지? 우리 종종 이렇게라도 ㅁㅁㅁ의 마음을 표현해볼까?", 20),
    new Challenge(3, "아침 안부 인사 전하기", "아침에 오늘 하루 잘 보내라는 말을 들으면 하루가 행복하대 ! 우리 같이 아침 인사 해볼까?", "헐 이렇게 스윗하게 보내다니! 완전 행복하겠다! ㅁㅁㅁ도 오늘 좋은 하루 보내기다!! 약속!!", 20),
    new Challenge(4, "함께 산책하기", "오늘 저녁에 약속있어? 날씨도 완전 선선한데 함께 집 앞 산책하면서 하루를 마무리 해보는게 어때?", "날씨 완전 좋더라! 뭐 힘들다구? 운동 부족이야 부족! 앞으로 자주자주 산책하자 어때?", 20),
    new Challenge(5, "최애 이모티콘 선물해주기", "부모님은 어떤 이모티콘 쓰셔?! 헐 그것도 귀여운데 우리 다른 이모티콘 선물해 보는게 어떨까?", "부모님이 완전 좋아하시지! 헐 직접 써서 보여주셨다고?! 완전 뿌듯하겠다! 작게라도 종종 마음을 전해보자!", 20),
    new Challenge(6, "가족과 3분이상 통화하기", "통화목록에 죄다 친구, 연인밖에 없지 ?! 오늘 부모님께 ~하자고 전화 드려봐! 두근두근", "부모님이 뭐라셔?! 목소리 들으니까 좋지?! 우리 하루에 한번은 부모님께 전화드리자!", 20),
    new Challenge(7, "부모님과 저녁먹기", "요즘 바빠서 같이 저녁 먹기 힘들지? 오늘은 오랜만에 같이 저녁 먹는거 어때? 집밥 먹자 집밥 !", "맛있는거 먹었어? 어머님 요리 완전 맛있어 보이더라.. 집밥이 짱이지 !", 20)
  ]),
  new Course(2, 5, "고급 사진가", "고급 사진가 설명", 7, 20, [
    new Challenge(1, "5가지 물건과 함께 사진찍기", "고급 사진가가 되는 첫 걸음! 5가지 물건과 함께 사진을 찍어봐. 벽은 포함 안 시켜줄거야!", "너 은근 조화로운 사진을 찍을 줄 아는구나!? ㅁㅁㅁ, 너 예상외로 사진 좀 찍는다!?", 20),
    new Challenge(2, "같은 장소에서 낮, 밤 사진 찍기", "같은 장소여도 낮이랑 밤은 분위기가 천차만별이지! 오늘은 그 차이를 느껴보자~", "낮, 밤 중에 어떤 시간이 더 맘에 들어? 왜 그렇게 생각하는지도 궁금해!", 20),
    new Challenge(3, "점프샷 찍기", "자 하나, 둘, 셋... 점프!! 과연 한 번에 성공할 수 있을까!?", "와 너 발에 스프링 단 거 아니지? 공중부양 한 줄 알았잖아..!! 빨리 자랑하러 가자!", 20),
    new Challenge(4, "친구와 전신 사진 찍기", "누가 더 키가 큰 지 대결해봐~ 뭐? 친구를 만날 수 없다고? 바로 앞에 있잖아!", " .. 나 브이하고 있었는데, 봤지?", 20),
    new Challenge(5, "아웃 포커싱 사진 찍기", "오늘은 내가 고급 스킬을 알려줄게. 바로 아웃포커싱! 아 이거 아무한테나 알려주는 거 아닌데~", "어때? 배경이 흐리니까 주인공에게 더 집중할 수 있는 것 같지 않아!? 다음엔 날 찍어줘~", 20),
    new Challenge(6, "동물 사진 찍기", "반려동물이 없다구!? 밖으로 나가면 고양이나 산책하는 강아지 친구들이랑 마주칠 수 있을거야~", "나 다음으로 귀여운 동물을 찍어왔네! 나보다 더 친해지면 안된다~", 20),
    new Challenge(7, "내 사진 찍기", "다른 사진도 좋지만, 가장 중요한 건 나 자신인 걸 잊지마! 다신 오지 않을 오늘의 내 모습을 남겨줘~!", "축하해! 고급 사진가가 되었어! 친구들에게 완전 인기 만점이겠는걸~? 고급 사진가가 된 기념으로 카메라를 사보는 건 어때?", 20)
  ]),
  new Course(3, 1, "그림 그리기, 참 쉽죠?", "그림 그리면서 미술 치료 하는 코스", 7, 20, [
    new Challenge(1, "제일 좋아하는 동물 그리기", "ㅁㅁㅁ, 어떤 동물을 가장 좋아해? 나인 거 다 알지만 그래도 한 번 물어는 봐줄게.", "ㅁㅁㅁ! 그림 너무 귀엽다!", 20),
    new Challenge(2, "가장 좋아하는 계절 그리기", "나는 겨울을 가장 좋아하는데, ㅁㅁㅁ, 너는?", "이 계절을 가장 좋아하는 이유도 궁금하다!", 20),
    new Challenge(3, "좋아하는 색깔로만 그리기", "진하게, 연하게! 세로로, 가로로 ... 한 가지 색으로도 여러 느낌을 낼 수 있어!", "한 가지 색으로 그린 그림 같지 않게 다채로운 그림이네!", 20),
    new Challenge(4, "책상 위에 있는 것 그리기", "지금 ㅁㅁㅁ의 책상 위엔 뭐가 놓여 있어? 한 가지를 골라 그려보자.", "ㅁㅁㅁ의 전체 책상 뷰가 궁금해지는 물건이네!", 20),
    new Challenge(5, "제일 좋아하는 음식 그리기", "최애 음식은 상상하는 것 만으로 행복해지지... 나는 치킨, 피자, ... 너무 많아!", "와.. 너무 먹고 싶다... 나 배고파졌어 ㅁㅁㅁ!!", 20),
    new Challenge(6, "최근에 꾼 꿈 그리기", "최근에 꾼 꿈이 기억나지 않는다면 기억에 남는 꿈을 그려봐!", "ㅁㅁㅁ, 꿈 자주 꿔? 꿈이 흑백인 사람도 있대!", 20),
    new Challenge(7, "자화상 그리기", "다른 사람들의 시선을 벗어나 나 자신을 탐색해보는거야!", "ㅁㅁㅁ, 자신을 솔직하게 표현해보니 어때?", 20)
  ]),
  new Course(4, 5, "나 돌아갈래", "학창 시절을 추억해보는 코스", 7, 20, [
    new Challenge(1, "교복 입은 사진 찾아보기", "처음 교복을 받아들고 학교 갈 준비를 하던 설레던 순간 기억나? 그 때를 떠올리며 교복 입은 사진을 찾아보자!", "교복 입은 ㅁㅁㅁ, 상상만 해도 앳되고 귀여워!", 20),
    new Challenge(2, "친구에게 받았던 편지 꺼내보기", "친구에게 과거의 너는 어떤 사람이었을까? 친구에게 받았던 편지를 꺼내보며 그 때를 추억해보자~", "오랜만에 친구의 편지를 읽어 본 소감이 어때? 오늘은 오랜만에 옛 친구에게 연락해보는 것도 좋겠다!", 20),
    new Challenge(3, "담임 선생님 이름 떠올리기", "스승의 은혜는 하늘 같아서~ 우러러 볼 수록 깊어만 가네! ㅁㅁㅁ, 기억에 남는 선생님이 있어? 성함이 뭐야?", "어느덧 어른이 된 ㅁㅁㅁ 처럼 선생님도 많이 나이가 들었겠다. 용기를 내서 선생님께 연락해보는 건 어때?", 20),
    new Challenge(4, "학창 시절 최애곡 찾아 듣기", "학창 시절 자주 듣던 노래 있어? 듣기만 해도 그 때가 떠오르는 최애곡, 오랜만에 들어보자! 나한테도 들려줘~", "급식으로 나오던 당근, 참 맛있었는데..", 20),
    new Challenge(5, "제일 친한 친구 이름 떠올리기", "학창 시절 제일 친했던 친구는 누구야?", "지금은 내가 제일 친구지? 그치?", 20),
    new Challenge(6, "로드맵으로 학교 구경하기", "학교가 어떤 모습이었는지, 그리고 학교 주변 풍경이 어땠는지 기억나? 로드맵으로 오랜만에 등교해볼까?", "우리 학교 운동장은 광활한 초원이었어. 정말 마음껏 뛰어놀았던 그 때가 그립다~", 20),
    new Challenge(7, "졸업 앨범 찾아보기", "졸업 사진 찍던 날, 설레는 마음으로 어떤 포즈를 취할 지 고민하던 거 기억나? 졸업앨범을 보며 그 때를 기억해봐~", "벌써 졸업하고 이렇게 어엿하게 멋진 어른이 된 네가 자랑스러워. 너무 너무 수고 많았어 😘", 20)
  ]),
  new Course(5, 2, "비움의 미학", "불필요한 것들을 덜어내는.. 미니멀리즘으로 한 발짝 다가가는 코스", 3, 20, [
    new Challenge(1, "냉장고 비우기", "언제 넣었는지도 모를 음식들이 냉장고 깊숙한 곳에 숨어있다구. 얼른 버려!", "냉장고를 비우고 나니까 마음 속이 후련하지 않아? 앞으로는 쌓아두지 말기!", 20),
    new Challenge(2, "서랍장 비우기", "서랍 속에 있었는 지도 몰랐던 물건들, 정말 필요한걸까? 과감히 버려보는 건 어때?", "공간 생겼다고 새 거 사는 거 아니지? 정말 필요한 물건으로만 채우기다!", 20),
    new Challenge(3, "옷장 비우기", "입지도 않으면서 아깝다고 쌓아두고 있는 옷들 있지? 과감히 버려보자.", "옷장이 숨 쉴 수 있게 됐어. 앞으로도 매일 작지만 불필요한 것들을 하나씩 비워나가보자!", 20)
  ]),
  new Course(6, 3, "아침부터 저녁까지", "아침부터 저녁까지 규칙적인 습관을 형성하는 코스", 7, 20, [
    new Challenge(1, "침대 정리하기", "잘 잤어? 오늘 침대는 정리하고 나왔어? 뭐야~ 안 했다고? 그럼 지금이 기회야 ㅁㅁㅁ!", "침대 정리 깜빡한 거 맞지? 내가 알려준 거다~?", 20),
    new Challenge(2, "샤워 전에 머리 빗기", "샤워 전에 머리를 빗으면 두피 건강에 좋다고 해! 빗을 가지고 가서 머리 한번 빗어보자!", "두피가 깨끗해진 느낌이 들지 않아?! 앞으로 습관으로 만들어봐!", 20),
    new Challenge(3, "밥 먹기 전 물 마시기", "밥 먹기 전에 우리 몸의 수분 보충은 필수지! 이거 비밀인데~ 건강에 그렇게 좋대!", "물 한 잔으로 과식을 방지하는 효과가 있다고 하던데~ ㅁㅁㅁ! 어땠어? 효과 있어?", 20),
    new Challenge(4, "30분 산책하기", "하루에 30분은 햇빛을 받아야 한대! 오늘 날씨도 좋은데 산책 어때?", "밖에 잠깐 나가니까 기분이 리프레시되지 않았어?! 귀찮았을 텐데 수고했어 ㅁㅁㅁ!", 20),
    new Challenge(5, "야식 먹지 않기", "ㅁㅁㅁ(이)가 야식 먹고 식도염에 걸리면 나는 너무 슬플 것 같아.. 오늘 밤에 배달 앱은 넣어둬!", "잘 참았어! 아주 기특해~ 대신 내일 아침 맛있는 거로 같이 먹는 거다!", 20),
    new Challenge(6, "자기 전 스트레칭하기", "자기 전에 스트레칭하면 수면의 질이 올라간대! ㅁㅁㅁ~ 오늘 꿀잠을 위해 간단한 스트레칭 어때?", "어때, 잠이 솔솔 오는 것 같지 않아?! 수고했어~ 잘자 ㅁㅁㅁ!", 20),
    new Challenge(7, "자기 전 멀티탭 전원 끄기", "멀티탭 전원을 꺼야 전력 낭비를 줄일 수 있대! ㅁㅁㅁ~ 모행~? 잘 거면 전원 끄고 자자!", "아차차 휴대폰은 전원 끄면 안 된다! 내가 기다리고 있어야 하거든~", 20)
  ]),
  new Course(7, 4, "오늘의 일일DJ", "매일매일 똑같은 노래만 듣긴 지겨우니까! 새로운 노래들을 플레이리스트에 추가해보자~", 7, 20, [
    new Challenge(1, "드라이브 할 때 듣기 좋은 노래", "드라이브에 노래가 빠질 수 없지! ㅁㅁㅁ! 드라이브 할 때 무슨 노래 들어?", "안되겠다... 나 오늘 드라이브 가야겠어!!", 20),
    new Challenge(2, "내가 태어난 해에 나온 노래", "ㅁㅁㅁ~ 너랑 동갑인 노래를 찾아 들어봐!", "선생님, 이 노래랑 친구시라고요...?", 20),
    new Challenge(3, "초등학생 때 많이 듣던 노래", "피아노, 태권도 학원 가는 길에 자주 들었던 노래를 들어보자! ", "ㅁㅁㅁ... 혹시 전자사전 세대? 미키마우스 MP3 세대?", 20),
    new Challenge(4, "여름이 생각나는 노래", "꼭 여름이 생각나는 청량한 노래들이 있지! 그런 노래들을 틀어봐~", "ㅁㅁㅁ, 여름 좋아해? 이런 노래를 들을 땐 여름이 좋아지더라~", 20),
    new Challenge(5, "제목에 색깔이 들어가는 노래", "ㅁㅁㅁ, 좋아하는 색이 뭐야? 오늘은 제목에 색깔이 들어가는 노래 듣자!", "알록달록~ 같은 색이여도 여러가지 분위기의 노래가 있는 것 같아!", 20),
    new Challenge(6, "춤 추고 싶어지는 노래", "둠칫둠칫 춤을 출 수 밖에 없는 노래를 들어보자! 내친김에 춤도 추자!", "ㅁㅁㅁ...!! 댄싱머신 이였구나..!!!", 20),
    new Challenge(7, "추천하고 싶은 노래", "ㅁㅁㅁ! 나를 보면 생각나는 노래를 추천해줘~", "오늘 자기 전엔 이 노래 한 곡 반복 하면서 잠들게! ㅁㅁㅁ, 고마워!", 20)
  ]),
  new Course(8, 7, "이번주는 다독다독", "책을 읽는 코스", 7, 20, [
    new Challenge(1, "읽을 책 고르기", "시작이 반이다! 독서는 읽을 책을 고르는 것 부터 시작된다구 ~ 무슨 장르 좋아해?", "제목부터 재밌어보이네! 피드에 자랑해 볼까?", 20),
    new Challenge(2, "20 페이지 이상 읽기", "처음은 쉽게 시작해보자. 매일매일 조금씩이라도 읽는 습관이 중요해!", "읽다보니 재밌어서 더 읽었다구? 아주 좋은 현상이야!", 20),
    new Challenge(3, "마음에 드는 문장 필사하기", "오늘 읽은 내용 중 마음에 든 문장을 적어보자.", "쓰윽 읽는 것과 한 글자씩 써보는 건 확실히 느낌이 다르지!?", 20),
    new Challenge(4, "30분 이상 읽기", "30분 동안 집중해서 읽어보자. 셋, 둘, 하나, 시작!", "30분 집중, 쉬운 건 절대 아니야. 수고했어 ㅁㅁㅁ!", 20),
    new Challenge(5, "오늘 읽은 내용 2줄 요약하기", "이런 목표를 가지고 독서를 하면, 더 깊게 생각하면서 독서를 하게 돼.", "오늘 읽은 내용의 핵심은 이거구나! 머릿속에 더 남는 것 같지?", 20),
    new Challenge(6, "30분 이상 읽기", "오늘도 30분 이상 집중해서 읽어보자. 꾸준히 하면 습관이 될 거야!", "꾸준히 독서하는 ㅁㅁㅁ 멋있어!", 20),
    new Challenge(7, "책 표지 찍어 피드에 공유하기", "이번 코스에서 읽은 책의 표지를 찍어서 피드에 올려줘.", "ㅁㅁㅁ! 앞으로도 꾸준히 마음의 양식을 쌓아보자!", 20)
  ]),
  new Course(9, 5, "중급 사진가", "중급 사진가 설명", 7, 20, [
    new Challenge(1, "일몰 사진 찍기", "오늘 일몰시간 언제래? 노을 구경도 할 겸 일몰 사진을 찍어보자!", "와... 노을 사진은 언제 봐도 마음이 편해지는 것 같아~ 너무 예쁘다!", 20),
    new Challenge(2, "내 뒷모습 찍기", "ㅁㅁㅁ, 네 뒷 모습을 본 적이 있어? 맨날 앞 모습만 보며 살았잖아, 오늘은 뒷 모습을 찍어보자!", "벌써 고난도의 사진 기술을 마스터하다니... 다른 사람들한테도 보여주자!", 20),
    new Challenge(3, "얼굴 없는 셀카 찍기", "그동안 셀카 찍을 때 얼굴에 집중했었지? 오늘은 나의 다른 부분에 집중해보자!", "너 얼굴 보기 싫어서 그런 거 아닌 거 알지? ", 20),
    new Challenge(4, "꽃 사진 찍기", "좋아하는 꽃이나 지나가다 마주친 꽃을 찍어봐! 무슨 향기가 나?", "혹시.. 바로 앞에 있는 꽃 안보여? 안보인다고? 흠.. 보일텐데~ 눈이 좀 안좋네~", 20),
    new Challenge(5, "오늘 입은 옷 찍기", "ㅁㅁㅁ의 데일리룩이 궁금해! ㅁㅁㅁ는 어떤 옷 스타일 좋아해?", "ㅁㅁㅁ, 너 옷도 잘 입었었어? 못 하는 게 뭔데!? 나도 못 입는 건 아니다 뭐!", 20),
    new Challenge(6, "파란색과 노란색이 있는 사진 찍기", "파랑, 노랑 좋아해? 나도 좋아하는데 우리 같이 파랑, 노랑 찾아볼래?", "헐, 이런 곳에 파랑, 노랑이 있었구나! 완전 의외인걸 ?!", 20),
    new Challenge(7, "방 사진 찍기", "너의 방은 어떤 무드로 가득한지 궁금해 ! 어떻게 채웠는지 보여주라!", " 이런 무드가 있었다니?! 감성 넘치는걸? 나도 ㅁㅁㅁ의 방처럼 꾸며 봐야겠어!", 20)
  ]),
  new Course(10, 7, "지구촌 촌장되기", "외국어를 간단하게 맛보기 해보는 코스.. 가볍게 가볍게~", 7, 20, [
    new Challenge(1, "3개 국어 인삿말 말하기", "니하오! 오늘은 나에게 3가지 언어로 인사해줘. 내가 힌트 하나 줬다!", "오~ 잘하는데?! 더 할 수 있어? 다른 친구들에게도 인사해줘!", 20),
    new Challenge(2, "외국인 유튜브 영상 보기", "관심있는 언어를 사용하는 유튜버의 영상을 찾아봐~ 재밌으면 나도 보여주기다!!", "눈으로도 보고, 귀로도 들었네~ 그럼 공부가 두 배로 됐겠다! 그치!", 20),
    new Challenge(3, "외국어 단어 5개 외우기", "몰랐던 외국어 단어를 딱 5개만 외워볼까? 나부터 할게~ apple, banana, ...", "진짜 외운 거 맞지!? 내일 쪽지시험 본다~?", 20),
    new Challenge(4, "어제 외운 단어로 문장 만들기", "어제 외운 단어 기억 나지? 어제 외운 단어로 문장을 만들어봐~", "와 진짜 외웠었네? 대단하다 ㅁㅁㅁ~ 아냐 아냐 의심한거 아니야 진짜야!!", 20),
    new Challenge(5, "외국어 신문 기사 도전해보기", "요즘 관심있는 주제 있어? 외국인 친구들의 의견도 한번 들어볼래?", "교양있는 ㅁㅁㅁ! 짱 멋있어! 나한테도 설명해 줘!", 20),
    new Challenge(6, "좋아하는 팝송 해석해보기", "ㅁㅁㅁ! 즐겨듣는 팝송 있어? 뜻을 알고 들으면 더 좋게 들릴 걸?", "와 이 노래 짱 좋다! 무슨 노래야? 불러줘 불러줘!", 20),
    new Challenge(7, "완료 누르고 외국어로 소확행 쓰기", "코스 마지막 날이야~ 완료 버튼을 누르고 지금까지 공부한 언어로 피드를 작성해줘!", "오늘은 양심에 맡긴다~ 꼭 남겨줘야 해!", 20)
  ]),
  new Course(11, 1, "집밥 모선생", "배달 음식에 중독된 당신을 위한 집밥 모선생과 함께하는 배달 음식 끊기 코스", 7, 20, [
    new Challenge(1, "마트 가서 장 보기", "텅텅 비어있는 냉장고, 안봐도 뻔해! 냉장고 채우러 마트 갔다와~ 이상한 거 사지 말고!", "어땠어? 난 마트 구경하는게 제일 재밌더라~ 물론 나 먹을 것도 샀지?", 20),
    new Challenge(2, "냉장고 털어먹기", "어디서 소리 안들려? 냉장고 안에서 들리는데.. 제발 빨리 먹어달라고 소리치고 있어~", "냉장고에 의외로 생각지도 못했던 것들이 많지 않아? 설마.. 먹지 말아야 할 것도 먹은건 아니지?", 20),
    new Challenge(3, "불 써서 요리 해먹기", "'요리' 라고 한다면 적어도 불은 써야하지 않을까? 계란 프라이라도 좋으니까 뭐든 해봐~", "불을 쓴 요리를 해먹다니.. 조만간 미슐랭 호텔의 쉐프가 되는 것도 머지 않았어, ㅁㅁㅁ!", 20),
    new Challenge(4, "예쁜 식기에 플레이팅 하기", "같은 음식이더라도 어떤 식기에 있느냐, 어떤 모양으로 담기냐에 따라 천차만별 일 걸?", "나를 위해 요리를 하고, 플레이팅을 한다는 것.. 정말 낭만적이지 않아?", 20),
    new Challenge(5, "반찬 두 개 놓고 밥 먹기", "적어도 두 가지 이상은 놓고 밥을 먹어야 제대로 먹은 기분이 나지 않을까? 오늘은 여러 반찬을 놓고 다양한 맛을 즐겨보자!", "요리 조리 골라먹는 재미 어땠어? 앞으로도 아무리 귀찮아도 두 가지 정도는 놓고 밥 먹기!", 20),
    new Challenge(6, "내일 먹을 요리 생각하기", "내일은 좀 더 제대로 된 한끼 어때? 찌개를 끓여본다던지.. 식재료가 없다면 미리 준비해놓는 것도 좋겠어~", "내일 뭘 먹을지 내가 더 설렌다~ 나도 초대해 줄 거지?", 20),
    new Challenge(7, "최후의 만찬", "재료는 모두 준비해놨지? 챌린지 마지막날이니 만큼, 맛있는 만찬을 즐겨봐!", "챌린지 끝났다고 다시 배달 시켜 먹으면 안된다! 다 지켜보고 있다구.", 20)
  ]),
  new Course(12, 5, "초보 사진가", "초보 사진가 설명", 7, 20, [
    new Challenge(1, "하늘 사진 찍기", "난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?", "엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~", 12),
    new Challenge(2, "저녁밥 사진 찍기", "오늘은 뭘 먹을거야? 저녁 거르면 안된다~ 맛있는 저녁 먹고 사진으로 남겨보자!", "와 *** 너만 맛있는 거 먹고... 나도 한 입만 주라... 딱 한 입만~", 10),
    new Challenge(3, "확대 사진 찍기", "요즘은 확대해서 찍는 게 감성이래. 깨져도 괜찮아~ 마음껏 줌인해봐!", "내 마음도 줌인해서 들여다봐주라~", 20),
    new Challenge(4, "손 사진 찍기", "***, 네 손은 어떻게 생겼어? 니 몸에서 제일 열일하는 친구에게 관심을 줘봐~", "내가 손금 봐줄게! 오~ 이 손금은...!!!", 15),
    new Challenge(5, "주황색이 들어간 사진 찍기", "오늘 내가 정한 행운의 색은 주황색이다 ***! 주황색이 보이는 사진을 찍어와!", "좋다~ 주황색은 뭔가 따듯한 느낌이야~ 그치 ***?", 32),
    new Challenge(6, "셀카 찍기", "오늘은 내 모습을 사진으로 남겨보자! 조금 부끄러워도 나중에 보면 귀엽다구~ 웃어 ***!", "조명, 배경 다 완벽해! 나도 같이 찍어주라! 딱 한 장만 더 찍자!", 28),
    new Challenge(7, "내가 제일 좋아하는 것 찍기", "***, 보기만 해도 기분이 좋아지는 거 있어?  사진으로 찍어 보여주라!", "와 나도 기분이 좋아지네~ 이걸 왜 좋아하는 지 알 것만 같아!", 25)
  ]),
  new Course(13, 7, "출발! 모행 영화 여행", "매일매일 추천해주는 장르로 영화를 보는 챌린지", 7, 20, [
    new Challenge(1, "코미디 영화 보기", "오늘부터 7개의 영화를 볼 거야 준비됐어? 가장 가볍게 볼 수 있는 코미디부터 시작하자고!", "ㅁㅁㅁ! 많이 웃었어? 웃으면 건강해지고 복이 온대 ~ 나도 조금 줄 거지?", 20),
    new Challenge(2, "미스테리 영화 보기", "영화 보면서 같이 추리하는 거 재미있지 않아? 누가 범인을 맞추는지 내기하자! 난 자신 있다고~", "이번 영화에서 가장 마음에 드는 캐릭터는 누구였어? 나는 정의로운 캐릭터가 좋더라 ~", 20),
    new Challenge(3, "로맨스 영화 보기", "오늘은 로맨스 영화를 한 편 볼까 ~ 이번에는 영화 음악에도 집중하면서 감상해 봐!", "나는 로맨스 영화에 쓰이는 음악들이 좋더라고~ ㅁㅁㅁ 너도 마음에 드는 곡 있었어? 나한테도 추천해 줘~", 20),
    new Challenge(4, "액션 영화 보기", "오늘의 장르는 스트레스를 한 방에 날려줄 액션 영화야! 이번에는 누군가와 함께 보는 건 어때?", "후~ 내가 다 속이 후련한 기분이야! 어떤 장면이 가장 마음에 들었어? 나는 주인공이 처음 등장하는 장면!", 20),
    new Challenge(5, "스릴러 영화 보기", "오싹한 스릴러 영화 어때? 잘 못 본다고? 괜찮아 내가 ㅁㅁㅁ 옆에 꼬옥 붙어 있어 줄게 걱정 말라고!", "어땠어? 사실… 나는 조금 무서웠어! 오늘 밤에 잘 수 있을까 걱정돼 ..", 20),
    new Challenge(6, "만화 영화 보기", "어렸을 때 만화 영화 좋아했는데! 어린 시절을 기억해 보면서 감상해보자. 분명 느낌이 다를 거야!", "나도 어렸을 때는 주인공처럼 될 수 있을 줄 알았는데 말이야! 나랑 주인공 조금 닮은 것 같아?", 20),
    new Challenge(7, "SF 공상 과학 영화 보기", "벌써 마지막 챌린지라니 아쉽다! 마지막 영화는 공상 과학 영화야 SF 감상의 묘미는 역시 CG 아니겠어?", "어떤 영화가 가장 재미있었어? ㅁㅁㅁ의 영화 취향도 알게 되고! 우리 더 가까워진거 맞지><?", 20)
  ]),
  new Course(14, 6, "친구찾아 삼만리", "부모님이나 친한 친구 혹은 연인에게 간단하게 자신의 마음을 표현할 수 있는 고런 코스", 7, 20, [
    new Challenge(1, "최애 노래 추천하기", "요즘 제일 자주 듣는 노래가 뭐야? 플레이리스트가 텅텅 비었던데 꽉꽉 채워주자! 어때!", "헐 이 노래 완전 좋은데?! 완전 내 스타일이야! 나한테도 다른 노래도 추천해주면 안돼?", 20),
    new Challenge(2, "오늘의 tmi 물어보기", "하루가 어땠는지 궁금하지않아? 사소한거라도 좋으니까 한번 물어볼까?", "오늘 무슨 일 있었대? 헐 그렇구나..! ㅁㅁㅁ의 오늘 하루는 어땠어?", 20),
    new Challenge(3, "함께 셀카 찍기", "뭐 부끄럽다고?! 둘 다 멋있고 예뻐서 괜찮아! 엽사라도 좋으니까 같이 찍어볼까?", "진짜 엽사를 찍으면 어떡해! 아 엽사 아니라고?! 둘 다 멋있고 예쁘게 잘 나왔네", 20),
    new Challenge(4, "산책하기", "오늘 날씨도 좋은데 친구랑 동네 한바퀴 걸어보는거 어때?! 못한 얘기도 좀 하면서 말야~", "동네 걸으니까 옛추억도 새록새록 떠오르고 좋지! 우리 바빠도 종종 친구랑 산책하자 !", 20),
    new Challenge(5, "함께 최애 카페 가기", "오늘은 친구와 노트북 없이 너의 최애카페에 가서 수다도 떨고 인생샷도 찍고 힐링을 해보는게 어떨까?", "친구랑 예쁜 사진 많이 찍었어? 거기 분위기 완전 좋던데 ~ 종종 친구와 카페가서 힐링하는거 어때 ?", 20),
    new Challenge(6, "집 데려다주기", "친구집 어딘지 기억 안나지? 서운해하겠어 ~ 오랜만에 친구랑 이야기 나누면서 집 앞까지 데려다줄까?", "드디어 기억났어? 그래~ 둘이 집 은근 가깝다니까~ 다음에는 친구가 데려다주기 약속해~", 20),
    new Challenge(7, "같이 아이스크림 먹기", "달달한 아이스크림 땡기지 않아? 나는 민트초코가 먹고싶네..! 친구랑 민트초코 아이스크림 먹으러 가는게 어때?", "뭐? 민트초코 싫어한다구? 그래서 어떤거 먹었는데? 헐 그거 맛있지.. 후식으로는 아이스크림이 짱이야~", 20)
  ])
];