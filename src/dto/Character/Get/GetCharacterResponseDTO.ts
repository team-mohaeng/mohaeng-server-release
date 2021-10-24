export interface GetCharacterResponseDTO {
  status: number;
  data: CharacterResponseDTO;
}

export interface CharacterResponseDTO {
  currentCharacter: CurrentCharacterDTO,
  currentSkin: CurrentSkinDTO,
  characters: CharacterDTO[],
  skins: SkinDTO[]
}

export interface CurrentCharacterDTO {
  id: number,
  image: string,
}

export interface CurrentSkinDTO {
  id: number,
  image: string,
}

export interface CharacterDTO {
  type: number,
  cards: cardDTO[]
}

export interface cardDTO {
  id: number,
  image: string,
  preview?: string,
  hasCard: boolean,
  isNew: boolean
}

export interface SkinDTO {
  id: number,
  image: string,
  hasSkin: boolean,
}


