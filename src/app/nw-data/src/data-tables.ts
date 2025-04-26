import {
  AbilityData,
  AchievementData,
  AchievementMetaData,
  AffixData,
  AffixStatData,
  AfflictionData,
  AfkModeData,
  AmmoItemDefinitions,
  AppearanceTransforms,
  ArchetypeData,
  ArenaBalanceData,
  ArmorAppearanceDefinitions,
  ArmorItemDefinitions,
  AttackTypes,
  AttributeDefinition,
  BackstoryDefinition,
  BeamData,
  BlueprintItemDefinitions,
  BuffBucketData,
  CameraShakeData,
  CampSkinData,
  CategoricalProgressionData,
  CategoricalProgressionRankData,
  CinematicVideoStaticData,
  CollectibleStaticData,
  CombatProfilesData,
  CombatSettingsData,
  CombatTextData,
  ConsumableItemDefinitions,
  ContributionData,
  ConversationStateData,
  ConversationTopicData,
  CooldownData,
  CostumeChangeData,
  CraftingCategoryData,
  CraftingRecipeData,
  CrestPartData,
  CurrencyExchangeData,
  CurseMutationStaticData,
  CutsceneCameraStaticData,
  DamageData,
  DamageTypeData,
  DarknessData,
  DarknessDifficultyData,
  DataPointData,
  DivertedLootData,
  DuelBalanceData,
  DyeColorData,
  DyeItemDefinitions,
  EconomyTrackerData,
  ElementalMutationStaticData,
  EmoteData,
  EncumbranceData,
  EntitlementData,
  ExpansionData,
  ExperienceData,
  FFAZoneBalanceData,
  FactionControlBuffDefinitions,
  FactionData,
  FactionStatusEffectData,
  FishData,
  FishingBaitData,
  FishingBehaviorsData,
  FishingCatchablesData,
  FishingHotspotsData,
  FishingPolesData,
  FishingWaterData,
  GameEventData,
  GameModeData,
  GameModeMapData,
  GameModeSchedulerStaticData,
  GatherableData,
  GeneratorRecipes,
  GenericInviteData,
  HouseItems,
  HouseTypeData,
  HousingSystemMessaging,
  HunterSightData,
  ImpactAudioTable,
  ImpactSurfaceAlignmentTable,
  ImpactTable,
  InfluenceTowerDefinitions,
  InputProfileData,
  InteractionAnimationData,
  ItemCurrencyConversionData,
  ItemPerkSwapData,
  ItemSkinData,
  ItemSoundEvents,
  ItemTooltipLayout,
  ItemTransform,
  JointAliasData,
  LeaderboardData,
  LeaderboardRewardsData,
  LeaderboardStatData,
  LevelDisparityData,
  LootBucketData,
  LootLimitData,
  LootTablesData,
  LootTagPresetData,
  LoreData,
  LoreItemDefinitions,
  ManaData,
  MasterItemDefinitions,
  MetaAchievementData,
  MissionData,
  MissionWeightsData,
  Moonshot,
  MountData,
  MountDyeItemDefinitions,
  MountItemAppearanceDefinitions,
  MountMovementData,
  MountTypeData,
  MusicalInstrumentSlot,
  MusicalPerformanceRewards,
  MusicalRanking,
  MusicalScoring,
  MutationDifficultyStaticData,
  MutationPerksStaticData,
  NPCData,
  NotificationData,
  ObjectiveTasks,
  Objectives,
  ObjectivesGlobalReleaseData,
  OpenWorldBalanceData,
  OutpostRushBalanceData,
  PUGRewardData,
  ParticleContextualPriorityOverrideData,
  ParticleData,
  PerkBucketData,
  PerkData,
  PerkExclusiveLabelData,
  PlayerMilestoneModalStaticData,
  PlayerTitleData,
  ProgressionPointData,
  ProgressionPoolData,
  PromotionMutationStaticData,
  PvPRankData,
  PvPStoreData,
  QuickCourseData,
  QuickCourseNodeTypeData,
  RandomEncounterDefinitions,
  RefiningRecipes,
  ResourceItemDefinitions,
  RewardData,
  RewardMilestoneData,
  RewardModifierData,
  RewardTrackItemData,
  ScheduleData,
  SeasonPassRankData,
  SeasonsRewardData,
  SeasonsRewardsActivitiesConfig,
  SeasonsRewardsActivitiesTasksData,
  SeasonsRewardsCardData,
  SeasonsRewardsCardTemplates,
  SeasonsRewardsChapterData,
  SeasonsRewardsJourneyData,
  SeasonsRewardsSeasonData,
  SeasonsRewardsStats,
  SeasonsRewardsTasks,
  SimpleTreeCategoryData,
  SkillData,
  SkillExperienceData,
  Socketables,
  SongBookData,
  SongBookSheets,
  SpecializationDefinitions,
  SpellData,
  StaminaData,
  StatMultiplierData,
  StatusEffectCategoryData,
  StatusEffectData,
  StoreCategoryProperties,
  StoreProductData,
  StoryProgressData,
  StructureFootprintData,
  StructurePieceData,
  TerritoryDefinition,
  TerritoryProgressionData,
  TerritoryUpkeepDefinition,
  ThrowableItemDefinitions,
  TimelineRegistryEntryData,
  TradeSkillPostCapData,
  TradeskillRankData,
  TutorialConditionData,
  TutorialContentData,
  TutorialData,
  TwitchDropsStatDefinitions,
  TwitchTagsStatDefinitions,
  VariationData,
  VariationDataGatherable,
  VitalsBaseData,
  VitalsCategoryData,
  VitalsData,
  VitalsLevelData,
  VitalsLevelVariantData,
  VitalsModifierData,
  WarBalanceData,
  WarboardStatDefinitions,
  WeaponAccessoryDefinitions,
  WeaponAppearanceDefinitions,
  WeaponEffectData,
  WeaponItemDefinitions,
  WhisperData,
  WhisperVfxData,
  WorldEventCategoryData,
  WorldEventRuleData
} from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface DataSheetUri<T> {
  uri: string;
}

export function getUri<T>(uri: string): DataSheetUri<T> {
  return { uri };
}

export const DATASHEETS = {
  AbilityData: {
    AIAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_ai.json'),
    ArtifactsAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_artifacts.json'),
    AttributeThresholdAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_attributethreshold.json'),
    BlunderbussAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_blunderbuss.json'),
    BowAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_bow.json'),
    FireMagicAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_firemagic.json'),
    FlailAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_flail.json'),
    GlobalAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_global.json'),
    GreatAxeAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_greataxe.json'),
    GreatswordAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_greatsword.json'),
    HatchetAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_hatchet.json'),
    IceMagicAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_icemagic.json'),
    ItemsAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_items.json'),
    LifeMagicAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_lifemagic.json'),
    MusketAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_musket.json'),
    PerksAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_perks.json'),
    RapierAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_rapier.json'),
    RuneAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_rune.json'),
    SeasonalItemsAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_seasonalitems.json'),
    SpearAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_spear.json'),
    SwordAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_sword.json'),
    VoidGauntletAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_voidgauntlet.json'),
    WarHammerAbilityTable: getUri<AbilityData>('datatables/weaponabilities/javelindata_ability_warhammer.json')
  },
  AchievementData: {
    AchievementDataTable: getUri<AchievementData>('datatables/javelindata_achievements.json')
  },
  AchievementMetaData: {
    AchievementMetaDataTable: getUri<AchievementMetaData>('datatables/javelindata_achievementmetadata.json')
  },
  AffixData: {
    AffixDataTable: getUri<AffixData>('datatables/javelindata_affixdefinitions.json')
  },
  AffixStatData: {
    AffixStatDataTable: getUri<AffixStatData>('datatables/javelindata_affixstats.json')
  },
  AfflictionData: {
    Afflictions: getUri<AfflictionData>('datatables/javelindata_afflictions.json')
  },
  AfkModeData: {
    AfkModes: getUri<AfkModeData>('datatables/javelindata_afkmodes.json')
  },
  AmmoItemDefinitions: {
    AmmoItemDefinitions: getUri<AmmoItemDefinitions>('datatables/javelindata_itemdefinitions_ammo.json')
  },
  AppearanceTransforms: {
    DefaultAppearanceTransforms: getUri<AppearanceTransforms>('datatables/javelindata_appearancetransformdata.json')
  },
  ArchetypeData: {
    ArchetypeDataTable: getUri<ArchetypeData>('datatables/javelindata_archetypes.json')
  },
  ArenaBalanceData: {
    ArenaPvpBalanceTable: getUri<ArenaBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_arena.json')
  },
  ArmorAppearanceDefinitions: {
    ArmorAppearances: getUri<ArmorAppearanceDefinitions>('datatables/javelindata_itemappearancedefinitions.json')
  },
  ArmorItemDefinitions: {
    ArmorItemDefinitions: getUri<ArmorItemDefinitions>('datatables/javelindata_itemdefinitions_armor.json')
  },
  AttackTypes: {
    AttackTypes: getUri<AttackTypes>('datatables/javelindata_attacktypes.json')
  },
  AttributeDefinition: {
    Constitution: getUri<AttributeDefinition>('datatables/javelindata_attributeconstitution.json'),
    Dexterity: getUri<AttributeDefinition>('datatables/javelindata_attributedexterity.json'),
    Focus: getUri<AttributeDefinition>('datatables/javelindata_attributefocus.json'),
    Intelligence: getUri<AttributeDefinition>('datatables/javelindata_attributeintelligence.json'),
    Strength: getUri<AttributeDefinition>('datatables/javelindata_attributestrength.json')
  },
  BackstoryDefinition: {
    Backstory: getUri<BackstoryDefinition>('datatables/javelindata_backstorydata.json')
  },
  BeamData: {
    Beams: getUri<BeamData>('datatables/javelindata_beams.json')
  },
  BlueprintItemDefinitions: {
    Blueprint: getUri<BlueprintItemDefinitions>('datatables/javelindata_itemdefinitions_blueprints.json')
  },
  BuffBucketData: {
    BuffBuckets: getUri<BuffBucketData>('datatables/javelindata_buffbuckets.json')
  },
  CameraShakeData: {
    CameraShakeDataTable: getUri<CameraShakeData>('datatables/javelindata_camerashake.json')
  },
  CampSkinData: {
    CampSkinDataTable: getUri<CampSkinData>('datatables/javelindata_campskins.json')
  },
  CategoricalProgressionData: {
    CategoricalProgression: getUri<CategoricalProgressionData>('datatables/javelindata_categoricalprogression.json')
  },
  CategoricalProgressionRankData: {
    AzothCurrency: getUri<CategoricalProgressionRankData>('datatables/javelindata_azothcurrency.json'),
    AzothSaltCurrency: getUri<CategoricalProgressionRankData>('datatables/javelindata_azothsaltcurrency.json'),
    BattleToken: getUri<CategoricalProgressionRankData>('datatables/javelindata_battletokens.json'),
    BountyGuild: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_bounty.json'),
    Camping: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_camping.json'),
    CollectiblesRankData: getUri<CategoricalProgressionRankData>('datatables/collectibles/javelindata_collectiblerankdata.json'),
    CovenantTokens: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_progression_covenanttokens.json'),
    EventRanks: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_event.json'),
    ExplorerGuild: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_explorer.json'),
    HalloweenEventRanks: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_halloweenevent.json'),
    HouseBonus: getUri<CategoricalProgressionRankData>('datatables/javelindata_housebonus.json'),
    MarauderTokens: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_progression_marauderstokens.json'),
    MerchantGuild: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_merchant.json'),
    MutatorRankData: getUri<CategoricalProgressionRankData>('datatables/gamemodemutators/javelindata_mutationrankdata.json'),
    ProcurerGuild: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_procurer.json'),
    Repair_T1: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_repair_t1.json'),
    Repair_T2: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_repair_t2.json'),
    Repair_T3: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_repair_t3.json'),
    Repair_T4: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_repair_t4.json'),
    Repair_T5: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_repair_t5.json'),
    SpringEventRanks: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_springevent.json'),
    SummerEventRanks: getUri<CategoricalProgressionRankData>('datatables/javelindata_progression_summerevent.json'),
    SyndicateTokens: getUri<CategoricalProgressionRankData>('datatables/javelindata_owg_progression_syndicatetokens.json'),
    Territory_Standing: getUri<CategoricalProgressionRankData>('datatables/javelindata_territory_standing.json'),
    WeaponMastery: getUri<CategoricalProgressionRankData>('datatables/javelindata_weaponmastery.json')
  },
  CinematicVideoStaticData: {
    CinematicVideo: getUri<CinematicVideoStaticData>('datatables/cinematics/javelindata_cinematicvideoregistry.json')
  },
  CollectibleStaticData: {
    Collectibles: getUri<CollectibleStaticData>('datatables/collectibles/javelindata_collectiblestaticdata.json')
  },
  CombatProfilesData: {
    CombatProfilesDataTable: getUri<CombatProfilesData>('datatables/combatsettings/javelindata_combatprofiles.json')
  },
  CombatSettingsData: {
    CombatSettingsDataTable: getUri<CombatSettingsData>('datatables/combatsettings/javelindata_combatsettings.json')
  },
  CombatTextData: {
    CombatTextSettings: getUri<CombatTextData>('datatables/javelindata_combattextsettings.json')
  },
  ConsumableItemDefinitions: {
    ConsumableItemDefinitions: getUri<ConsumableItemDefinitions>('datatables/javelindata_itemdefinitions_consumables.json')
  },
  ContributionData: {
    ArenaContribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_arena.json'),
    Contribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_default.json'),
    DarknessContribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_darkness.json'),
    DefendObjectContribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_defendobject.json'),
    InvasionContribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_invasion.json'),
    QuestEncContribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_questencounter.json'),
    Season_02_Event_Contribution: getUri<ContributionData>('datatables/contribution/javelindata_contribution_season_02_event.json')
  },
  ConversationStateData: {
    ConversationStates: getUri<ConversationStateData>('datatables/javelindata_conversationstate.json'),
    ConversationStates_74: getUri<ConversationStateData>('datatables/quests/74_devworld_red/javelindata_74_conversationstate.json'),
    ConversationStates_75: getUri<ConversationStateData>('datatables/quests/75_devworld_blue/javelindata_75_conversationstate.json'),
    ConversationStates_C01: getUri<ConversationStateData>('datatables/quests/console/c01_starterbeach/javelindata_c01_conversationstates.json'),
    ConversationStates_C02A: getUri<ConversationStateData>('datatables/quests/console/c02a_brightwood/javelindata_c02a_conversationstates.json'),
    ConversationStates_C03: getUri<ConversationStateData>('datatables/quests/console/c03_greatcleave/javelindata_c03_conversationstate.json'),
    ConversationStates_C04A: getUri<ConversationStateData>('datatables/quests/console/c04a_everfall/javelindata_c04a_conversationstates.json'),
    ConversationStates_C05: getUri<ConversationStateData>('datatables/quests/console/c05_reekwater/javelindata_c05_conversationstate.json'),
    ConversationStates_C06A: getUri<ConversationStateData>('datatables/quests/console/c06a_windsward/javelindata_c06a_conversationstates.json'),
    ConversationStates_C07: getUri<ConversationStateData>('datatables/quests/console/c07_shatteredmoutain/javelindata_c07_conversationstate.json'),
    ConversationStates_C08: getUri<ConversationStateData>('datatables/quests/console/c08_ebonscalereach/javelindata_c08_conversationstate.json'),
    ConversationStates_C09A: getUri<ConversationStateData>('datatables/quests/console/c09a_firstlight/javelindata_c09a_conversationstate.json'),
    ConversationStates_C10A: getUri<ConversationStateData>('datatables/quests/console/c10a_cutlasskeys/javelindata_c10a_conversationstate.json'),
    ConversationStates_C11: getUri<ConversationStateData>('datatables/quests/console/c11_mourningdale/javelindata_c11_conversationstate.json'),
    ConversationStates_C12A: getUri<ConversationStateData>('datatables/quests/console/c12a_monarchsbluffs/javelindata_c12a_conversationstates.json'),
    ConversationStates_C13A: getUri<ConversationStateData>('datatables/quests/console/c13a_weaversfen/javelindata_c13a_conversationstates.json'),
    ConversationStates_C14: getUri<ConversationStateData>('datatables/quests/console/c14_edengrove/javelindata_c14_conversationstate.json'),
    ConversationStates_C15: getUri<ConversationStateData>('datatables/quests/console/c15_restlessshore/javelindata_c15_conversationstate.json'),
    ConversationStates_C16: getUri<ConversationStateData>('datatables/quests/console/c16_brimstonesands/javelindata_c16_conversationstate.json'),
    ConversationStates_C80: getUri<ConversationStateData>('datatables/quests/console/c80_holidays/javelindata_c80_conversationstates.json'),
    ConversationStates_C81: getUri<ConversationStateData>('datatables/quests/console/c81_pushquests/javelindata_c81_conversationstates.json'),
    ConversationStates_C91: getUri<ConversationStateData>('datatables/quests/console/c91_fishing/javelindata_c91_conversationstates.json'),
    ConversationStates_C94: getUri<ConversationStateData>('datatables/quests/console/c94_mounts/javelindata_c94_conversationstates.json'),
    ConversationStates_C95: getUri<ConversationStateData>('datatables/quests/console/c95_seasons/javelindata_c95_conversationstates.json'),
    ConversationStates_C95A: getUri<ConversationStateData>('datatables/quests/console/c95a_seasons_s02/javelindata_c95a_conversationstates.json'),
    ConversationStates_C95_S04: getUri<ConversationStateData>('datatables/quests/console/c95_seasons_s04/javelindata_c95_s04_conversationstates.json'),
    ConversationStates_C98: getUri<ConversationStateData>('datatables/quests/console/c98_factions/javelindata_c98_conversationstates.json'),
    ConversationStates_C99A: getUri<ConversationStateData>('datatables/quests/console/c99a_msq/javelindata_c99a_conversationstates.json'),
    ConversationStates_C99B: getUri<ConversationStateData>('datatables/quests/console/c99b_msq_brightwood/javelindata_c99b_conversationstates.json'),
    ConversationStates_C99C: getUri<ConversationStateData>('datatables/quests/console/c99c_msq_weaversfen/javelindata_c99c_conversationstates.json'),
    ConversationStates_C99D: getUri<ConversationStateData>('datatables/quests/console/c99d_msq_greatcleave/javelindata_c99d_conversationstates.json'),
    ConversationStates_C99E: getUri<ConversationStateData>('datatables/quests/console/c99e_msq_edengrove/javelindata_c99e_conversationstates.json'),
    ConversationStates_C99F: getUri<ConversationStateData>('datatables/quests/console/c99f_msq_ebonscale/javelindata_c99f_conversationstates.json'),
    ConversationStates_C99G: getUri<ConversationStateData>('datatables/quests/console/c99g_msq_shattered/javelindata_c99g_conversationstates.json')
  },
  ConversationTopicData: {
    ConversationTopics: getUri<ConversationTopicData>('datatables/javelindata_conversationtopics.json'),
    ConversationTopics_75: getUri<ConversationTopicData>('datatables/quests/75_devworld_blue/javelindata_75_conversationtopic.json'),
    ConversationTopics_C01: getUri<ConversationTopicData>('datatables/quests/console/c01_starterbeach/javelindata_c01_conversationtopics.json'),
    ConversationTopics_C02A: getUri<ConversationTopicData>('datatables/quests/console/c02a_brightwood/javelindata_c02a_conversationtopics.json'),
    ConversationTopics_C03: getUri<ConversationTopicData>('datatables/quests/console/c03_greatcleave/javelindata_c03_conversationtopics.json'),
    ConversationTopics_C04A: getUri<ConversationTopicData>('datatables/quests/console/c04a_everfall/javelindata_c04a_conversationtopics.json'),
    ConversationTopics_C05: getUri<ConversationTopicData>('datatables/quests/console/c05_reekwater/javelindata_c05_conversationtopics.json'),
    ConversationTopics_C06A: getUri<ConversationTopicData>('datatables/quests/console/c06a_windsward/javelindata_c06a_conversationtopics.json'),
    ConversationTopics_C07: getUri<ConversationTopicData>('datatables/quests/console/c07_shatteredmoutain/javelindata_c07_conversationtopics.json'),
    ConversationTopics_C08: getUri<ConversationTopicData>('datatables/quests/console/c08_ebonscalereach/javelindata_c08_conversationtopics.json'),
    ConversationTopics_C09A: getUri<ConversationTopicData>('datatables/quests/console/c09a_firstlight/javelindata_c09a_conversationtopics.json'),
    ConversationTopics_C10A: getUri<ConversationTopicData>('datatables/quests/console/c10a_cutlasskeys/javelindata_c10a_conversationtopics.json'),
    ConversationTopics_C11: getUri<ConversationTopicData>('datatables/quests/console/c11_mourningdale/javelindata_c11_conversationtopics.json'),
    ConversationTopics_C12A: getUri<ConversationTopicData>('datatables/quests/console/c12a_monarchsbluffs/javelindata_c12a_conversationtopics.json'),
    ConversationTopics_C13A: getUri<ConversationTopicData>('datatables/quests/console/c13a_weaversfen/javelindata_c13a_conversationtopics.json'),
    ConversationTopics_C14: getUri<ConversationTopicData>('datatables/quests/console/c14_edengrove/javelindata_c14_conversationtopics.json'),
    ConversationTopics_C15: getUri<ConversationTopicData>('datatables/quests/console/c15_restlessshore/javelindata_c15_conversationtopics.json'),
    ConversationTopics_C16: getUri<ConversationTopicData>('datatables/quests/console/c16_brimstonesands/javelindata_c16_conversationtopics.json'),
    ConversationTopics_C80: getUri<ConversationTopicData>('datatables/quests/console/c80_holidays/javelindata_c80_conversationtopics.json'),
    ConversationTopics_C81: getUri<ConversationTopicData>('datatables/quests/console/c81_pushquests/javelindata_c81_conversationtopics.json'),
    ConversationTopics_C91: getUri<ConversationTopicData>('datatables/quests/console/c91_fishing/javelindata_c91_conversationtopics.json'),
    ConversationTopics_C94: getUri<ConversationTopicData>('datatables/quests/console/c94_mounts/javelindata_c94_conversationtopics.json'),
    ConversationTopics_C95: getUri<ConversationTopicData>('datatables/quests/console/c95_seasons/javelindata_c95_conversationtopics.json'),
    ConversationTopics_C95A: getUri<ConversationTopicData>('datatables/quests/console/c95a_seasons_s02/javelindata_c95a_conversationtopics.json'),
    ConversationTopics_C95_S04: getUri<ConversationTopicData>('datatables/quests/console/c95_seasons_s04/javelindata_c95_s04_conversationtopics.json'),
    ConversationTopics_C98: getUri<ConversationTopicData>('datatables/quests/console/c98_factions/javelindata_c98_conversationtopics.json'),
    ConversationTopics_C99A: getUri<ConversationTopicData>('datatables/quests/console/c99a_msq/javelindata_c99a_conversationtopics.json'),
    ConversationTopics_C99B: getUri<ConversationTopicData>('datatables/quests/console/c99b_msq_brightwood/javelindata_c99b_conversationtopics.json'),
    ConversationTopics_C99C: getUri<ConversationTopicData>('datatables/quests/console/c99c_msq_weaversfen/javelindata_c99c_conversationtopics.json'),
    ConversationTopics_C99D: getUri<ConversationTopicData>('datatables/quests/console/c99d_msq_greatcleave/javelindata_c99d_conversationtopics.json'),
    ConversationTopics_C99E: getUri<ConversationTopicData>('datatables/quests/console/c99e_msq_edengrove/javelindata_c99e_conversationtopics.json'),
    ConversationTopics_C99F: getUri<ConversationTopicData>('datatables/quests/console/c99f_msq_ebonscale/javelindata_c99f_conversationtopics.json'),
    ConversationTopics_C99G: getUri<ConversationTopicData>('datatables/quests/console/c99g_msq_shattered/javelindata_c99g_conversationtopics.json')
  },
  CooldownData: {
    Cooldowns_Player: getUri<CooldownData>('datatables/javelindata_cooldowns_player.json')
  },
  CostumeChangeData: {
    CostumeChanges: getUri<CostumeChangeData>('datatables/costumechanges/javelindata_costumechanges.json')
  },
  CraftingCategoryData: {
    CraftingCategories: getUri<CraftingCategoryData>('datatables/javelindata_craftingcategories.json')
  },
  CraftingRecipeData: {
    CraftingRecipes: getUri<CraftingRecipeData>('datatables/javelindata_crafting.json'),
    CraftingRecipesArcana: getUri<CraftingRecipeData>('datatables/javelindata_crafting_arcana.json'),
    CraftingRecipesArmorer: getUri<CraftingRecipeData>('datatables/javelindata_crafting_armorer.json'),
    CraftingRecipesCooking: getUri<CraftingRecipeData>('datatables/javelindata_crafting_cooking.json'),
    CraftingRecipesDungeon: getUri<CraftingRecipeData>('datatables/javelindata_crafting_dungeon.json'),
    CraftingRecipesEngineer: getUri<CraftingRecipeData>('datatables/javelindata_crafting_engineer.json'),
    CraftingRecipesGypKilm: getUri<CraftingRecipeData>('datatables/javelindata_crafting_gypkilm.json'),
    CraftingRecipesJeweler: getUri<CraftingRecipeData>('datatables/javelindata_crafting_jeweler.json'),
    CraftingRecipesMisc: getUri<CraftingRecipeData>('datatables/javelindata_crafting_misc.json'),
    CraftingRecipesRaid: getUri<CraftingRecipeData>('datatables/javelindata_crafting_raid.json'),
    CraftingRecipesRefining: getUri<CraftingRecipeData>('datatables/javelindata_crafting_refining.json'),
    CraftingRecipesSeasonalServers: getUri<CraftingRecipeData>('datatables/javelindata_crafting_seasonalserver.json'),
    CraftingRecipesSeasons: getUri<CraftingRecipeData>('datatables/javelindata_crafting_seasons.json'),
    CraftingRecipesSpecialtyShops: getUri<CraftingRecipeData>('datatables/javelindata_crafting_specialtyshops.json'),
    CraftingRecipesWeapon: getUri<CraftingRecipeData>('datatables/javelindata_crafting_weapon.json')
  },
  CrestPartData: {
    Crests: getUri<CrestPartData>('datatables/javelindata_crestdata.json')
  },
  CurrencyExchangeData: {
    CurrencyExchange: getUri<CurrencyExchangeData>('datatables/javelindata_currencyexchangerates.json')
  },
  CurseMutationStaticData: {
    CurseMutation: getUri<CurseMutationStaticData>('datatables/gamemodemutators/javelindata_cursemutations.json')
  },
  CutsceneCameraStaticData: {
    CutsceneCameraPresets: getUri<CutsceneCameraStaticData>('datatables/cinematics/javelindata_cutscenecamerapresets.json')
  },
  DamageData: {
    AGIceGuardianBossDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_04/javelindata_damagetable_ag_iceguardianboss.json'),
    AGIceGuardianBossSoloDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_04/javelindata_damagetable_ag_iceguardianbosssolo.json'),
    AbominableLiangDamageTable: getUri<DamageData>('datatables/charactertables/grunt_datatables/javelindata_damagetable_abominable_liang.json'),
    AdianaAIDamageTable: getUri<DamageData>('datatables/charactertables/adiana_datatables/javelindata_damagetable_adiana_archer.json'),
    AdolescentSprigganDamageTable: getUri<DamageData>('datatables/charactertables/spriggan_datatables/javelindata_damagetable_adolescentspriggan.json'),
    AlligatorDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_alligator.json'),
    AlligatorYoungDamageTable: getUri<DamageData>('datatables/charactertables/alligator_datatables/javelindata_damagetable_alligatoryoung.json'),
    AncientAmalgamDamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ancientamalgam.json'),
    AncientGuardianDamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ancientguardian.json'),
    AncientGuardianHeavyBossDamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ancientguardianheavyboss.json'),
    AncientGuardian_Bowman_IceVariant_DamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ag_ice_bowman.json'),
    AncientGuardian_Greatsword_IceVariant_DamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ag_ice_greatsword.json'),
    AncientGuardian_Spearman_IceVariant_DamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ag_ice_spearman.json'),
    AncientGuardian_Warhammer_IceVariant_DamageTable: getUri<DamageData>('datatables/charactertables/ancientguardian_datatables/javelindata_damagetable_ag_ice_warhammer.json'),
    AnubianGuardian_BruteDamageTable: getUri<DamageData>('datatables/charactertables/anubianguardian_datatables/javelindata_damagetable_anubianguardian_brute.json'),
    AnubianGuardian_HorusDamageTable: getUri<DamageData>('datatables/charactertables/anubianguardian_datatables/javelindata_damagetable_anubianguardian_horus.json'),
    AnubianLotusScarabDamageTable: getUri<DamageData>('datatables/charactertables/anubianscarab_datatables/javelindata_damagetable_anubianlotusscarab.json'),
    AnubianScarabDamageTable: getUri<DamageData>('datatables/charactertables/anubianscarab_datatables/javelindata_damagetable_anubianscarab.json'),
    ArmoredDragonDamageTable: getUri<DamageData>('datatables/charactertables/armored_dragon/javelindata_damagetable_armoreddragon.json'),
    BabySandwormDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_02/javelindata_damagetable_babysandworm.json'),
    BaronessHainDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_or_ghost_boss.json'),
    BearBlackDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear_black.json'),
    BearCubDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear_cub.json'),
    BearDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear.json'),
    BearDamnedDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear_damned.json'),
    BearElementalDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear_elemental.json'),
    BearThorpeMinionDamageTable: getUri<DamageData>('datatables/charactertables/bear_datatables/javelindata_damagetable_bear_thorpe_minion.json'),
    BisonDamageTable: getUri<DamageData>('datatables/charactertables/bison_datatables/javelindata_damagetable_bison.json'),
    BisonStrangeDamageTable: getUri<DamageData>('datatables/charactertables/bison_datatables/javelindata_damagetable_bison_strange.json'),
    BlightFiendDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_blightfiend.json'),
    BloatedCorpseDamageTable: getUri<DamageData>('datatables/charactertables/bomber_datatables/javelindata_damagetable_bloated_corpse.json'),
    BloodOfTheSandsDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_02/javelindata_damagetable_malek_bloodofthesands.json'),
    BoarDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_boar.json'),
    BogMonsterDamageTable: getUri<DamageData>('datatables/charactertables/bogmonster_datatables/javelindata_damagetable_bogmonster.json'),
    BrokenAxeThrowerDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_axethrower.json'),
    BrokenDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_broken.json'),
    BrokenPitchforkDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_pitchfork.json'),
    BrokenVillager2hAxeDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_2haxe.json'),
    BrokenVillager2hPickDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_2hpick.json'),
    BrokenVillagerCleaverDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_cleaver.json'),
    BrokenVillagerHammerDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_hammer.json'),
    BrokenVillagerKnifeDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_knife.json'),
    BrokenVillagerLadelDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_ladel.json'),
    BrokenVillagerProngDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_prong.json'),
    BrokenVillagerRakeDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_rake.json'),
    BrokenVillagerShovelDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_shovel.json'),
    BrokenVillagerSickleDamageTable: getUri<DamageData>('datatables/charactertables/broken_datatables/javelindata_damagetable_brokenvillager_sickle.json'),
    BrotherUmbertoDamageTable: getUri<DamageData>('datatables/charactertables/brother_umberto_datatables/javelindata_damagetable_brother_umberto.json'),
    BruteDamageTable: getUri<DamageData>('datatables/charactertables/brute_datatables/javelindata_damagetable_brute.json'),
    Brute_Yeti_DamageTable: getUri<DamageData>('datatables/charactertables/brute_datatables/javelindata_damagetable_brute_yeti.json'),
    ChameleonDragonDamageTable: getUri<DamageData>('datatables/charactertables/chameleon_datatables/javelindata_damagetable_chameleon.json'),
    CommanderLothDamageTable: getUri<DamageData>('datatables/charactertables/commanderloth_datatables/javelindata_damagetable_commanderloth.json'),
    CorruptedLegion_Cyclops_DamageTable: getUri<DamageData>('datatables/charactertables/legion_datatables/javelindata_damagetable_corruptedlegion_cyclops.json'),
    CorruptedLeviathanDamageTable: getUri<DamageData>('datatables/charactertables/corruptedleviathan_datatables/javelindata_damagetable_corrupted_leviathan.json'),
    CorruptedSwarmerDamageTable: getUri<DamageData>('datatables/charactertables/swarmer_datatables/javelindata_damagetable_corruptedswarmer.json'),
    CorruptedTigerDamageTable: getUri<DamageData>('datatables/charactertables/lion_datatables/javelindata_damagetable_corrupted_tiger.json'),
    CorruptionEntityDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_corruptionentity.json'),
    CorruptionHeavyDamageTable: getUri<DamageData>('datatables/charactertables/corruptionheavy_datatables/javelindata_damagetable_corruption_heavy.json'),
    DaichiSotoDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_04/javelindata_damagetable_s04_daichi.json'),
    DamageTable: getUri<DamageData>('datatables/javelindata_damagetable.json'),
    DamageTable_Perks: getUri<DamageData>('datatables/javelindata_damagetable_perks.json'),
    DamageTable_Structures: getUri<DamageData>('datatables/javelindata_damagetable_structures.json'),
    DamnedAcolyteDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_damned_acolyte.json'),
    DamnedCommanderFireDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_damned_commander.json'),
    DamnedCommanderFireDamageTable_FTUE: getUri<DamageData>('datatables/javelindata_damagetable_damned_commander_ftue.json'),
    DamnedCultistDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_damned_cultist.json'),
    DamnedDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_damned.json'),
    DamnedDamageTable_Damned_FTUE: getUri<DamageData>('datatables/javelindata_ftue_damagetable_damned.json'),
    DamnedFirstMateDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_damned_firstmate.json'),
    DamnedGreatAxeDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_damned_greataxe.json'),
    DamnedHoundDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_damned_hound.json'),
    DamnedPriestDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_damned_priest.json'),
    DryadProwlerDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryadprowler.json'),
    DryadSirenDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryad_siren.json'),
    DryadSoldierDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryadsoldier.json'),
    DryadTendrilDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryadtendril.json'),
    DunePhantomBerserkerDamageTable: getUri<DamageData>('datatables/charactertables/dunephantom_datatables/javelindata_damagetable_dunephantom_berserker.json'),
    DunePhantom_Huntress_DamageTable: getUri<DamageData>('datatables/charactertables/dunephantom_datatables/javelindata_damagetable_dunephantom_huntress.json'),
    DunePhantom_Tank_DamageTable: getUri<DamageData>('datatables/charactertables/dunephantom_datatables/javelindata_damagetable_dunephantom_tank.json'),
    DungeonDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_dungeon.json'),
    DynastyEmpressDamageTable: getUri<DamageData>('datatables/charactertables/empress_datatables/javelindata_damagetable_empress.json'),
    DynastyEmpressPedestalDamageTable: getUri<DamageData>('datatables/charactertables/empress_datatables/javelindata_damagetable_pedestal.json'),
    DynastyHeavyDamageTable: getUri<DamageData>('datatables/charactertables/corruptionheavy_datatables/javelindata_damagetable_dynasty_heavy.json'),
    DynastyMaidenDamageTable: getUri<DamageData>('datatables/charactertables/empress_datatables/javelindata_damagetable_maiden.json'),
    DynastyMusketeerDamageTable: getUri<DamageData>('datatables/charactertables/dynasty_datatables/javelindata_damagetable_dynasty_musketeer.json'),
    DynastySpearmanDamageTable: getUri<DamageData>('datatables/charactertables/dynasty_datatables/javelindata_damagetable_dynasty_spearman.json'),
    DynastySummonerDamageTable: getUri<DamageData>('datatables/charactertables/dynasty_datatables/javelindata_damagetable_dynasty_summoner.json'),
    DynastyWarriorDamageTable: getUri<DamageData>('datatables/charactertables/dynasty_datatables/javelindata_damagetable_dynasty_warrior.json'),
    Elephant_H_DamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_elephant_h.json'),
    EliteAffixDamageTable: getUri<DamageData>('datatables/charactertables/eliteaffix_datatables/javelindata_damagetable_elite_affix.json'),
    ElkCorruptedDamageTable: getUri<DamageData>('datatables/charactertables/elk_datatables/javelindata_damagetable_elk_corrupted.json'),
    ElkDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_elk.json'),
    ElkMotherwellDamageTable: getUri<DamageData>('datatables/charactertables/elk_datatables/javelindata_damagetable_elk_motherwell.json'),
    ElkSpringStagDamageTable: getUri<DamageData>('datatables/charactertables/elk_datatables/javelindata_damagetable_elk_springstag.json'),
    EvilKnightBowIceVariantDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_evil_knight_bow_icevariant.json'),
    EvilKnightFlamekeeperDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_evil_knight_flamekeeper.json'),
    EvilKnightGruntmasterDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_evil_knight_gruntmaster.json'),
    EvilKnightMaceIceDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_maceice.json'),
    EvilKnightSpearIceDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_evil_knight_spear_icevariant.json'),
    EvilKnightSwordIceDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_evil_knight_swordice.json'),
    EvilKnightVoidGauntletDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_voidgauntlet.json'),
    ExplosiveSproutFireDamageTable: getUri<DamageData>('datatables/charactertables/explosivesprout_datatables/javelindata_damagetable_explosivesprout_fire.json'),
    EzraForgemaster: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_ezraforgemaster.json'),
    FTUEDamageTableMiner: getUri<DamageData>('datatables/javelindata_ftue_damagetable_undead_grenadier.json'),
    FeralArcherDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryadarcher.json'),
    FeralShamanDamageTable: getUri<DamageData>('datatables/charactertables/dryad_datatables/javelindata_damagetable_dryadshaman.json'),
    FireChampionDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_firechampion.json'),
    FireNagaDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga_fire.json'),
    FlameGruntDamageTable: getUri<DamageData>('datatables/charactertables/grunt_datatables/javelindata_damagetable_flamegrunt.json'),
    FulgorisDamageTable: getUri<DamageData>('datatables/charactertables/brute_datatables/javelindata_damagetable_fulgoris.json'),
    GenericBossDamageTable: getUri<DamageData>('datatables/charactertables/boss_datatables/javelindata_damagetable_boss.json'),
    GhostCharredDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost_charred.json'),
    GhostDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost.json'),
    GhostFrozenDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost_frozen.json'),
    GhostPlaguedDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost_plagued.json'),
    GhostShackledDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost_shackled.json'),
    GhostShipwreckedDamageTable: getUri<DamageData>('datatables/charactertables/ghost_datatables/javelindata_damagetable_ghost_shipwrecked.json'),
    GoatDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_goat.json'),
    GoliathHorusBossDamageTable: getUri<DamageData>('datatables/charactertables/anubianguardian_datatables/javelindata_damagetable_goliathhorusboss.json'),
    Goliath_BruteBossDamageTable: getUri<DamageData>('datatables/charactertables/anubianguardian_datatables/javelindata_damagetable_goliathbruteboss.json'),
    GorillaBossDamageTable: getUri<DamageData>('datatables/charactertables/gorilla_datatables/javelindata_damagetable_gorillaboss.json'),
    GorillaDamageTable: getUri<DamageData>('datatables/charactertables/gorilla_datatables/javelindata_damagetable_gorilla.json'),
    Gorilla_H_DamageTable: getUri<DamageData>('datatables/charactertables/gorilla_datatables/javelindata_damagetable_gorilla_h.json'),
    GruntDamageTable: getUri<DamageData>('datatables/charactertables/grunt_datatables/javelindata_damagetable_grunt.json'),
    HercyneBoarDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercyneboar.json'),
    HercyneBroodmotherDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercynebroodmother.json'),
    HercyneCorvidDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercynecorvid.json'),
    HercyneEchidnaDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercyneechidna.json'),
    HercyneReindeerDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercynereindeer.json'),
    HercyneTyphonDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercynetyphon.json'),
    HercyneWolfDamageTable: getUri<DamageData>('datatables/charactertables/hercyne_datatables/javelindata_damagetable_hercynewolf.json'),
    HumanBlunderbussDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_blunderbuss.json'),
    HumanBowDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_bow.json'),
    HumanGreatAxeDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_greataxe.json'),
    HumanGreatAxeIceVariantDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_greataxe_icevariant.json'),
    HumanHeavyDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_heavy.json'),
    HumanLifeStaffDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_lifestaff.json'),
    HumanMaceDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_mace.json'),
    HumanRapierDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_rapier.json'),
    HumanSpearDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_spear.json'),
    HumanSpellcasterDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_spellcaster.json'),
    HumanSpellcasterIceVariantDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_caster_icevariant.json'),
    HumanSwordDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_sword.json'),
    HumanWarhammerDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_warhammer.json'),
    HumanWarhammerIceDamageTable: getUri<DamageData>('datatables/charactertables/human_datatables/javelindata_damagetable_human_warhammer_icevariant.json'),
    IceDragonDamageTable: getUri<DamageData>('datatables/charactertables/ice_dragon/javelindata_damagetable_icedragon.json'),
    IceDragonSoloDamageTable: getUri<DamageData>('datatables/charactertables/ice_dragon/javelindata_damagetable_icedragon_solo.json'),
    IceDragon_EssenceFragment_DamageTable: getUri<DamageData>('datatables/charactertables/ice_dragon/javelindata_damagetable_icedragon_essencefragment.json'),
    IceDryadFrostfangDamageTable: getUri<DamageData>('datatables/charactertables/icedryad_datatables/javelindata_damagetable_icedryad_frostfang.json'),
    IceDryadFrostgripDamageTable: getUri<DamageData>('datatables/charactertables/icedryad_datatables/javelindata_damagetable_icedryad_frostgrip.json'),
    IceDryad_Fiend_Shivers_Damage: getUri<DamageData>('datatables/charactertables/icedryad_datatables/javelindata_damagetable_icedryad_fiend_shivers.json'),
    IceGolem_DamageTable: getUri<DamageData>('datatables/charactertables/brute_datatables/javelindata_damagetable_icegolem.json'),
    IceTorsoBossDamageTable: getUri<DamageData>('datatables/charactertables/torsoboss_datatables/javelindata_damagetable_ice_torso_boss.json'),
    ImhotepDamageTable: getUri<DamageData>('datatables/charactertables/questnpc_datatables/javelindata_damagetable_imhotep.json'),
    InvasionBomberDamageTable: getUri<DamageData>('datatables/charactertables/bomber_datatables/javelindata_damagetable_invasion_bomber.json'),
    Invasion_Priest_DamageTable: getUri<DamageData>('datatables/charactertables/invasion_datatables/javelindata_damagetable_invasion_priest.json'),
    IsabellaDynastyShipyardDamageTable: getUri<DamageData>('datatables/charactertables/isabella_datatables/javelindata_damagetable_isabella_dynastyshipyard.json'),
    IsabellaLairPhase1DamageTable: getUri<DamageData>('datatables/charactertables/isabella_datatables/javelindata_damagetable_isabella_lair_phase1.json'),
    IsabellaLairPhase2DamageTable: getUri<DamageData>('datatables/charactertables/isabella_datatables/javelindata_damagetable_isabella_lair_phase2.json'),
    IsabellaMSQ2DamageTable: getUri<DamageData>('datatables/charactertables/isabella_datatables/javelindata_damagetable_isabella_solo_msq2.json'),
    IsabellaTigerDamageTable: getUri<DamageData>('datatables/charactertables/lion_datatables/javelindata_damagetable_isabella_tiger.json'),
    KnightHoundDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_evil_knight_hound.json'),
    KnightWolfDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_knight_wolf.json'),
    LegionGeneralCrassusBossDamageTable: getUri<DamageData>('datatables/charactertables/legion_datatables/javelindata_damagetable_legion_general_crassus_boss.json'),
    LegionLegionnaireDamageTable: getUri<DamageData>('datatables/charactertables/legion_datatables/javelindata_damagetable_legion_legionnaire.json'),
    LegionSagittariiDamageTable: getUri<DamageData>('datatables/charactertables/legion_datatables/javelindata_damagetable_legion_sagittarii.json'),
    LegionSigniferDamageTable: getUri<DamageData>('datatables/charactertables/legion_datatables/javelindata_damagetable_legion_signifer.json'),
    LionDamageTable: getUri<DamageData>('datatables/charactertables/lion_datatables/javelindata_damagetable_lion.json'),
    LostFencerDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_lost_fencer.json'),
    LostKnightBowDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_lost_knight_bow.json'),
    LostKnightTankDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_lost_knight_tank.json'),
    LostMonarchDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_lost_monarch.json'),
    LostPikemanDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_lost_pikeman.json'),
    LostSirenDamageTable: getUri<DamageData>('datatables/charactertables/lostsiren_datatables/javelindata_damagetable_lost_siren.json'),
    MalekDamageTable: getUri<DamageData>('datatables/charactertables/seasons_datatables/season_02/javelindata_damagetable_malek.json'),
    MammothBossDamageTable: getUri<DamageData>('datatables/charactertables/mammoth_datatables/javelindata_damagetable_mammoth_boss.json'),
    MammothDamageTable: getUri<DamageData>('datatables/charactertables/mammoth_datatables/javelindata_damagetable_mammoth.json'),
    MammothWorldBossDamageTable: getUri<DamageData>('datatables/charactertables/mammoth_datatables/javelindata_damagetable_mammoth_world_boss.json'),
    MedeaDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_medea.json'),
    MedusaDamageTable: getUri<DamageData>('datatables/charactertables/medusa_datatables/javelindata_damagetable_medusa.json'),
    MegaTurkeyDamageTable: getUri<DamageData>('datatables/charactertables/turkey_datatables/javelindata_damagetable_turkey.json'),
    Mordred_DamageTable: getUri<DamageData>('datatables/charactertables/mordred_datatables/javelindata_damagetable_mordred.json'),
    MutatorDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_mutators.json'),
    NagaAncientGuardianDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga_ancientguardian.json'),
    NagaAngryEarthDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga_angryearth.json'),
    NagaCorruptedDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga_corrupted.json'),
    NagaDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga.json'),
    NagaWitheredDamageTable: getUri<DamageData>('datatables/charactertables/naga_datatables/javelindata_damagetable_naga_withered.json'),
    OgreDamageTable: getUri<DamageData>('datatables/charactertables/ogre_datatables/javelindata_damagetable_corrupted_ogre.json'),
    OgreMinionDamageTable: getUri<DamageData>('datatables/charactertables/ogre_datatables/javelindata_damagetable_corrupted_ogre_minion.json'),
    OvergrownBeetleDamageTable: getUri<DamageData>('datatables/charactertables/overgrownbeetle_datatables/javelindata_damagetable_overgrownbeetle.json'),
    OverseerZaneDamageTable: getUri<DamageData>('datatables/charactertables/damned_datatables/javelindata_damagetable_overseerzane.json'),
    PriestLesserDamnedHoundDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_priest_lesser_damned_hound.json'),
    RatHercyneRatDamageTable: getUri<DamageData>('datatables/charactertables/rat_datatables/javelindata_damagetable_rat_hercynerat.json'),
    RazorLotusDamageTable: getUri<DamageData>('datatables/charactertables/megaflora_datatables/javelindata_damagetable_megaflora_razorlotus.json'),
    RisenDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_risen.json'),
    Risen_FtWDamageTable: getUri<DamageData>('datatables/ftw/javelindata_damagetable_risen_ftw.json'),
    SandElementalHeavyDamageTable: getUri<DamageData>('datatables/charactertables/sandelemental_datatables/javelindata_damagetable_sandelemental_heavy.json'),
    SandElementalHeavySandwormDamageTable: getUri<DamageData>('datatables/charactertables/sandelemental_datatables/sandelemental_heavy_sandworm.json'),
    SandElementalQuestBossDamageTable: getUri<DamageData>('datatables/charactertables/sandelemental_datatables/javelindata_damagetable_sandelemental_questboss.json'),
    SandElementalShamanDamageTable: getUri<DamageData>('datatables/charactertables/sandelemental_datatables/javelindata_damagetable_sandelemental_shaman.json'),
    SandElementalSoldierDamageTable: getUri<DamageData>('datatables/charactertables/sand_elemental_soldier/javelindata_damagetable_sand_elemental_soldier.json'),
    SandwormArenaEncounterDamageTable: getUri<DamageData>('datatables/charactertables/sandworm_datatables/javelindata_damagetable_sandworm.json'),
    ScorpionDamageTable: getUri<DamageData>('datatables/charactertables/scorpion_datatables/javelindata_damagetable_scorpion.json'),
    ScorpionImpalerDamageTable: getUri<DamageData>('datatables/charactertables/scorpion_datatables/javelindata_damagetable_scorpion_impaler.json'),
    ScorpionSingerDamageTable: getUri<DamageData>('datatables/charactertables/scorpion_datatables/javelindata_damagetable_scorpion_slinger.json'),
    ScorpionSingerDamageTableSandworm: getUri<DamageData>('datatables/charactertables/scorpion_datatables/javelindata_damagetable_scorpion_slinger_sandworm.json'),
    ScorpionSulfurDamageTable: getUri<DamageData>('datatables/charactertables/scorpion_datatables/javelindata_damagetable_scorpion_sulfur.json'),
    ShiversDamageTable: getUri<DamageData>('datatables/charactertables/icedryad_datatables/javelindata_damagetable_icedryad_fiend_shivers_2.json'),
    Skeleton1HSwordDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeleton1hsword.json'),
    Skeleton2hSwordDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeleton2hsword.json'),
    SkeletonArcherDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeletonarcher.json'),
    SkeletonClubDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeletonclub.json'),
    SkeletonCrawlerDamageTable: getUri<DamageData>('datatables/charactertables/swarmer_datatables/javelindata_damagetable_skeletoncrawler.json'),
    SkeletonDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_skeleton.json'),
    SkeletonMageDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeletonmage.json'),
    SkeletonSpearDamageTable: getUri<DamageData>('datatables/charactertables/skeleton_datatables/javelindata_damagetable_skeletonspear.json'),
    SpellBotDamageTable: getUri<DamageData>('datatables/charactertables/spellbot_datatables/javelindata_damagetable_spellbot.json'),
    SpiderDamageTable: getUri<DamageData>('datatables/charactertables/spider_datatables/javelindata_damagetable_spider.json'),
    SpiritDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_spirit.json'),
    SprigganCorruptedDamageTable: getUri<DamageData>('datatables/charactertables/spriggan_datatables/javelindata_damagetable_spriggan_corrupted.json'),
    SprigganDamageTable: getUri<DamageData>('datatables/charactertables/spriggan_datatables/javelindata_damagetable_spriggan.json'),
    SprigganInvasionDamageTable: getUri<DamageData>('datatables/charactertables/invasion_datatables/javelindata_damagetable_spriggan_invasion.json'),
    SulfurDragonDamageTable: getUri<DamageData>('datatables/charactertables/sulfur_dragon/javelindata_damagetable_sulfurdragon.json'),
    SulfurElementalEntityDamageTable: getUri<DamageData>('datatables/charactertables/sulfurelemental_damagetables/javelindata_damagetable_sulfurelementalentity.json'),
    SulfurLizardDamageTable: getUri<DamageData>('datatables/charactertables/sulfur_dragon/javelindata_damagetable_sulfurlizard.json'),
    SwampBeastDamageTable: getUri<DamageData>('datatables/charactertables/brute_datatables/javelindata_damagetable_swampbeast.json'),
    SwampFiendDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_swamp_fiend.json'),
    SwarmancerMedeaDamageTable: getUri<DamageData>('datatables/charactertables/lostknights_datatables/javelindata_damagetable_swarmancer_medea_minion.json'),
    TendrilCorruptedDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_tendril_corrupted.json'),
    TendrilLeviathanDamageTable: getUri<DamageData>('datatables/charactertables/corruptedleviathan_datatables/javelindata_damagetable_tendril_leviathan.json'),
    TigerDamageTable: getUri<DamageData>('datatables/charactertables/lion_datatables/javelindata_damagetable_tiger.json'),
    TorsoBossDamageTable: getUri<DamageData>('datatables/charactertables/torsoboss_datatables/javelindata_damagetable_torso_boss.json'),
    UndeadAdmiralBruteDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_admiral_brute.json'),
    UndeadBerserkerDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_berserker.json'),
    UndeadBruteDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_brute.json'),
    UndeadDamageTable: getUri<DamageData>('datatables/javelindata_damagetable_undead.json'),
    UndeadGravediggerDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_gravedigger.json'),
    UndeadGrenadierDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_grenadier.json'),
    UndeadHunterDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_hunter.json'),
    UndeadJavelineerDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_javelineer.json'),
    UndeadNavigatorDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_navigator.json'),
    UndeadOfficerDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_officer.json'),
    UndeadPirateBruteDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_pirate_brute.json'),
    UndeadPistoleerDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_pistoleer.json'),
    UndeadShamanDamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_shaman.json'),
    Undead_Sailor_DamageTable: getUri<DamageData>('datatables/charactertables/undead_datatables/javelindata_damagetable_undead_sailor.json'),
    WitheredBeetleDamageTable: getUri<DamageData>('datatables/charactertables/witheredbeetle_datatables/javelindata_damagetable_witheredbeetle.json'),
    WitheredFeculentDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_withered_feculent.json'),
    WitheredSwarmancerDamageTable: getUri<DamageData>('datatables/charactertables/risen_datatables/javelindata_damagetable_withered_swarmancer.json'),
    WolfAlphaDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_wolf_alpha.json'),
    WolfBarkimedesDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/named/javelindata_damagetable_wolf_barkimedes.json'),
    WolfBrownDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_wolf_brown.json'),
    WolfDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_wolf.json'),
    WolfWhiteDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_wolf_white.json'),
    Wolf_WinterDamageTable: getUri<DamageData>('datatables/charactertables/wolf_datatables/javelindata_damagetable_wolf_winter.json'),
    YonasDamageTable: getUri<DamageData>('datatables/charactertables/questnpc_datatables/javelindata_damagetable_yonas_msq2_trial.json'),
    ZaneTendrilCorruptedDamageTable: getUri<DamageData>('datatables/charactertables/questnpc_datatables/javelindata_damagetable_zane_tendril.json')
  },
  DamageTypeData: {
    DamageTypes: getUri<DamageTypeData>('datatables/javelindata_damagetypes.json')
  },
  DarknessData: {
    DarknessDataTable: getUri<DarknessData>('datatables/javelindata_darkness.json')
  },
  DarknessDifficultyData: {
    'Territory Advancement Level': getUri<DarknessDifficultyData>('datatables/javelindata_difficulty_darkness.json')
  },
  DataPointData: {
    DataPointDataTable: getUri<DataPointData>('datatables/javelindata_datapoints.json')
  },
  DivertedLootData: {
    DivertedLootMaster: getUri<DivertedLootData>('datatables/javelindata_divertedloot.json')
  },
  DuelBalanceData: {
    DuelPvpBalanceTable: getUri<DuelBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_duels.json')
  },
  DyeColorData: {
    DyeColorDataTable: getUri<DyeColorData>('datatables/javelindata_dyecolors.json')
  },
  DyeItemDefinitions: {
    DyeItemDefinitions: getUri<DyeItemDefinitions>('datatables/javelindata_itemdefinitions_dye.json')
  },
  EconomyTrackerData: {
    EconomyTrackers: getUri<EconomyTrackerData>('datatables/javelindata_economytrackers.json')
  },
  ElementalMutationStaticData: {
    ElementalMutation: getUri<ElementalMutationStaticData>('datatables/gamemodemutators/javelindata_elementalmutations.json')
  },
  EmoteData: {
    EmoteDefinitions: getUri<EmoteData>('datatables/javelindata_emotedefinitions.json')
  },
  EncumbranceData: {
    EncumbranceLimits: getUri<EncumbranceData>('datatables/javelindata_encumbrancelimits.json')
  },
  EntitlementData: {
    EntitlementData: getUri<EntitlementData>('datatables/javelindata_entitlements.json')
  },
  ExpansionData: {
    Expansions: getUri<ExpansionData>('datatables/javelindata_expansions.json')
  },
  ExperienceData: {
    XPLevels: getUri<ExperienceData>('datatables/javelindata_xpamountsbylevel.json')
  },
  FFAZoneBalanceData: {
    FFAZonePvpBalanceTable: getUri<FFAZoneBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_ffa.json')
  },
  FactionControlBuffDefinitions: {
    FactionControl_Buffs: getUri<FactionControlBuffDefinitions>('datatables/javelindata_factioncontrol_buffs.json')
  },
  FactionData: {
    Factions: getUri<FactionData>('datatables/javelindata_factiondata.json')
  },
  FactionStatusEffectData: {
    FactionStatusEffect: getUri<FactionStatusEffectData>('datatables/javelindata_factionstatuseffects.json')
  },
  FishData: {
    Fish: getUri<FishData>('datatables/javelindata_itemdefinitions_fish.json')
  },
  FishingBaitData: {
    FishingBaitMastersheet: getUri<FishingBaitData>('datatables/fishing/javelindata_fishing_bait.json')
  },
  FishingBehaviorsData: {
    FishingBehaviorsMastersheet: getUri<FishingBehaviorsData>('datatables/fishing/javelindata_fishing_behaviors.json')
  },
  FishingCatchablesData: {
    FishingCatchablesMastersheet: getUri<FishingCatchablesData>('datatables/fishing/javelindata_fishing_catchables.json')
  },
  FishingHotspotsData: {
    FishingHotspotsMastersheet: getUri<FishingHotspotsData>('datatables/fishing/javelindata_fishing_hotspots.json')
  },
  FishingPolesData: {
    FishingPolesMastersheet: getUri<FishingPolesData>('datatables/fishing/javelindata_fishing_poles.json')
  },
  FishingWaterData: {
    FishingWaterMastersheet: getUri<FishingWaterData>('datatables/fishing/javelindata_fishing_water.json')
  },
  GameEventData: {
    '(Jump Top of Creatures)': getUri<GameEventData>('datatables/javelindata_gameevents.json'),
    GameEvents_01: getUri<GameEventData>('datatables/questgameevents/javelindata_01_gameevents.json'),
    GameEvents_02: getUri<GameEventData>('datatables/questgameevents/javelindata_02_gameevents.json'),
    GameEvents_02A: getUri<GameEventData>('datatables/questgameevents/javelindata_02a_gameevents.json'),
    GameEvents_03: getUri<GameEventData>('datatables/questgameevents/javelindata_03_gameevents.json'),
    GameEvents_04: getUri<GameEventData>('datatables/questgameevents/javelindata_04_gameevents.json'),
    GameEvents_04A: getUri<GameEventData>('datatables/questgameevents/javelindata_04a_gameevents.json'),
    GameEvents_05: getUri<GameEventData>('datatables/questgameevents/javelindata_05_gameevents.json'),
    GameEvents_06: getUri<GameEventData>('datatables/questgameevents/javelindata_06_gameevents.json'),
    GameEvents_06A: getUri<GameEventData>('datatables/questgameevents/javelindata_06a_gameevents.json'),
    GameEvents_07: getUri<GameEventData>('datatables/questgameevents/javelindata_07_gameevents.json'),
    GameEvents_08: getUri<GameEventData>('datatables/questgameevents/javelindata_08_gameevents.json'),
    GameEvents_09: getUri<GameEventData>('datatables/questgameevents/javelindata_09_gameevents.json'),
    GameEvents_09A: getUri<GameEventData>('datatables/questgameevents/javelindata_09a_gameevents.json'),
    GameEvents_10: getUri<GameEventData>('datatables/questgameevents/javelindata_10_gameevents.json'),
    GameEvents_10A: getUri<GameEventData>('datatables/questgameevents/javelindata_10a_gameevents.json'),
    GameEvents_11: getUri<GameEventData>('datatables/questgameevents/javelindata_11_gameevents.json'),
    GameEvents_12: getUri<GameEventData>('datatables/questgameevents/javelindata_12_gameevents.json'),
    GameEvents_12A: getUri<GameEventData>('datatables/questgameevents/javelindata_12a_gameevents.json'),
    GameEvents_13: getUri<GameEventData>('datatables/questgameevents/javelindata_13_gameevents.json'),
    GameEvents_13A: getUri<GameEventData>('datatables/questgameevents/javelindata_13a_gameevents.json'),
    GameEvents_14: getUri<GameEventData>('datatables/questgameevents/javelindata_14_gameevents.json'),
    GameEvents_15: getUri<GameEventData>('datatables/questgameevents/javelindata_15_gameevents.json'),
    GameEvents_16: getUri<GameEventData>('datatables/questgameevents/javelindata_16_gameevents.json'),
    GameEvents_74: getUri<GameEventData>('datatables/questgameevents/javelindata_74_gameevents.json'),
    GameEvents_75: getUri<GameEventData>('datatables/questgameevents/javelindata_75_gameevents.json'),
    GameEvents_80: getUri<GameEventData>('datatables/questgameevents/javelindata_80_gameevents.json'),
    GameEvents_81: getUri<GameEventData>('datatables/questgameevents/javelindata_81_gameevents.json'),
    GameEvents_91: getUri<GameEventData>('datatables/questgameevents/javelindata_91_gameevents.json'),
    GameEvents_92: getUri<GameEventData>('datatables/questgameevents/javelindata_92_gameevents.json'),
    GameEvents_94: getUri<GameEventData>('datatables/questgameevents/javelindata_94_gameevents.json'),
    GameEvents_95: getUri<GameEventData>('datatables/questgameevents/javelindata_95_gameevents.json'),
    GameEvents_95A: getUri<GameEventData>('datatables/questgameevents/javelindata_95a_gameevents.json'),
    GameEvents_95_s04: getUri<GameEventData>('datatables/questgameevents/javelindata_95_s04_gameevents.json'),
    GameEvents_98: getUri<GameEventData>('datatables/questgameevents/javelindata_98_gameevents.json'),
    GameEvents_99: getUri<GameEventData>('datatables/questgameevents/javelindata_99_gameevents.json'),
    GameEvents_99A: getUri<GameEventData>('datatables/questgameevents/javelindata_99a_gameevents.json'),
    GameEvents_99B: getUri<GameEventData>('datatables/questgameevents/javelindata_99b_gameevents.json'),
    GameEvents_99C: getUri<GameEventData>('datatables/questgameevents/javelindata_99c_gameevents.json'),
    GameEvents_99D: getUri<GameEventData>('datatables/questgameevents/javelindata_99d_gameevents.json'),
    GameEvents_99E: getUri<GameEventData>('datatables/questgameevents/javelindata_99e_gameevents.json'),
    GameEvents_99F: getUri<GameEventData>('datatables/questgameevents/javelindata_99f_gameevents.json'),
    GameEvents_99G: getUri<GameEventData>('datatables/questgameevents/javelindata_99g_gameevents.json'),
    GameEvents_VoicedLore: getUri<GameEventData>('datatables/questgameevents/javelindata_voicedlore_gameevents.json')
  },
  GameModeData: {
    GameModes: getUri<GameModeData>('datatables/javelindata_gamemodes.json')
  },
  GameModeMapData: {
    GameModeMap: getUri<GameModeMapData>('datatables/javelindata_gamemodemaps.json')
  },
  GameModeSchedulerStaticData: {
    GameModeScheduler: getUri<GameModeSchedulerStaticData>('datatables/javelindata_gamemodescheduler.json')
  },
  GatherableData: {
    Gatherables: getUri<GatherableData>('datatables/javelindata_gatherables.json'),
    QuestGatherables: getUri<GatherableData>('datatables/javelindata_questgatherables.json')
  },
  GeneratorRecipes: {
    GeneratorRecipes: getUri<GeneratorRecipes>('datatables/javelindata_generatorrecipes.json')
  },
  GenericInviteData: {
    GenericInvites: getUri<GenericInviteData>('datatables/javelindata_genericinvites.json')
  },
  HouseItems: {
    HouseItems: getUri<HouseItems>('datatables/javelindata_housingitems.json'),
    HouseItemsMTX: getUri<HouseItems>('datatables/mtx/javelindata_housingitems_mtx.json')
  },
  HouseTypeData: {
    HouseTypes: getUri<HouseTypeData>('datatables/javelindata_housetypes.json')
  },
  HousingSystemMessaging: {
    HousingSystemMessaging: getUri<HousingSystemMessaging>('datatables/javelindata_housingsystemmessaging.json')
  },
  HunterSightData: {
    HunterSight: getUri<HunterSightData>('datatables/javelindata_huntersight.json')
  },
  ImpactAudioTable: {
    ImpactAudioTable_Characters: getUri<ImpactAudioTable>('datatables/impactsystem/impactaudiotable_characters.json'),
    ImpactAudioTable_Environment: getUri<ImpactAudioTable>('datatables/impactsystem/impactaudiotable_environment.json')
  },
  ImpactSurfaceAlignmentTable: {
    ImpactTable_SurfaceAlignment: getUri<ImpactSurfaceAlignmentTable>('datatables/impactsystem/impacttable_surfacealignment.json')
  },
  ImpactTable: {
    ImpactTable_Characters: getUri<ImpactTable>('datatables/impactsystem/impacttable_characters.json'),
    ImpactTable_Environment: getUri<ImpactTable>('datatables/impactsystem/impacttable_environment.json')
  },
  InfluenceTowerDefinitions: {
    FactionControl_Towers: getUri<InfluenceTowerDefinitions>('datatables/javelindata_factioncontrol_towerdefinitions.json')
  },
  InputProfileData: {
    InputProfiles: getUri<InputProfileData>('datatables/javelindata_inputprofiles.json')
  },
  InteractionAnimationData: {
    InteractionAnimations: getUri<InteractionAnimationData>('datatables/javelindata_interactionanimations.json')
  },
  ItemCurrencyConversionData: {
    ItemCurrencyConversions: getUri<ItemCurrencyConversionData>('datatables/javelindata_itemcurrencyconversion.json')
  },
  ItemPerkSwapData: {
    ItemPerkSwaps: getUri<ItemPerkSwapData>('datatables/javelindata_itemperkswaps.json')
  },
  ItemSkinData: {
    ItemSkinDataTable: getUri<ItemSkinData>('datatables/javelindata_itemskins.json')
  },
  ItemSoundEvents: {
    ItemSoundTable: getUri<ItemSoundEvents>('datatables/javelindata_itemdefinitions_sounds.json')
  },
  ItemTooltipLayout: {
    ItemTooltipLayout: getUri<ItemTooltipLayout>('datatables/javelindata_itemdefinitions_tooltiplayout.json')
  },
  ItemTransform: {
    DefaultItemTransforms: getUri<ItemTransform>('datatables/javelindata_itemtransformdata.json')
  },
  JointAliasData: {
    JointAlias: getUri<JointAliasData>('datatables/javelindata_jointalias.json')
  },
  LeaderboardData: {
    LeaderboardDataTable: getUri<LeaderboardData>('datatables/javelindata_leaderboard.json')
  },
  LeaderboardRewardsData: {
    LeaderboardRewardsDataTable: getUri<LeaderboardRewardsData>('datatables/javelindata_leaderboardrewards.json')
  },
  LeaderboardStatData: {
    LeaderboardStatDataTable: getUri<LeaderboardStatData>('datatables/javelindata_leaderboardstats.json')
  },
  LevelDisparityData: {
    AILevelDisparity: getUri<LevelDisparityData>('datatables/javelindata_aileveldisparity.json')
  },
  LootBucketData: {
    LootBuckets: getUri<LootBucketData>('datatables/javelindata_lootbuckets.json'),
    LootBucketsFish: getUri<LootBucketData>('datatables/fishing/javelindata_lootbuckets_fishing.json'),
    LootBucketsPlaytest: getUri<LootBucketData>('datatables/javelindata_lootbuckets_playtest.json'),
    LootBucketsPvP: getUri<LootBucketData>('datatables/javelindata_lootbuckets_pvp.json')
  },
  LootLimitData: {
    LootLimits: getUri<LootLimitData>('datatables/javelindata_lootlimits.json')
  },
  LootTablesData: {
    LootTables: getUri<LootTablesData>('datatables/javelindata_loottables.json'),
    LootTables_Fishing: getUri<LootTablesData>('datatables/javelindata_loottables_fishing.json'),
    LootTables_MTX: getUri<LootTablesData>('datatables/mtx/javelindata_loottables_mtx.json'),
    LootTables_Omega: getUri<LootTablesData>('datatables/javelindata_loottables_omega.json'),
    LootTables_Playtest: getUri<LootTablesData>('datatables/javelindata_loottables_playtest.json'),
    LootTables_PvP: getUri<LootTablesData>('datatables/pvp_rewardstrack/javelindata_loottables_pvp_rewards_track.json'),
    LootTables_Salvage: getUri<LootTablesData>('datatables/javelindata_loottables_salvage.json'),
    LootTables_Seasons: getUri<LootTablesData>('datatables/javelindata_loottables_seasons.json')
  },
  LootTagPresetData: {
    LootTagPresets: getUri<LootTagPresetData>('datatables/javelindata_loottagpresets.json')
  },
  LoreData: {
    Lore: getUri<LoreData>('datatables/javelindata_loreitems.json')
  },
  LoreItemDefinitions: {
    LoreItemDefinitions: getUri<LoreItemDefinitions>('datatables/javelindata_itemdefinitions_lore.json')
  },
  ManaData: {
    ManaCosts_Player: getUri<ManaData>('datatables/javelindata_manacosts_player.json')
  },
  MasterItemDefinitions: {
    MasterItemDefinitions_AI: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_ai.json'),
    MasterItemDefinitions_Artifacts: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_artifacts.json'),
    MasterItemDefinitions_Common: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_common.json'),
    MasterItemDefinitions_ConquerorsItems: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_conquerorsitems.json'),
    MasterItemDefinitions_Crafting: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_crafting.json'),
    MasterItemDefinitions_Faction: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_faction.json'),
    MasterItemDefinitions_Loot: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_loot.json'),
    MasterItemDefinitions_MTX_2023Apr: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-04.json'),
    MasterItemDefinitions_MTX_2023Aug: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-08.json'),
    MasterItemDefinitions_MTX_2023Dec: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-12.json'),
    MasterItemDefinitions_MTX_2023Feb: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-02.json'),
    MasterItemDefinitions_MTX_2023Jan: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-01.json'),
    MasterItemDefinitions_MTX_2023Jul: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-07.json'),
    MasterItemDefinitions_MTX_2023Jun: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-06.json'),
    MasterItemDefinitions_MTX_2023Mar: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-03.json'),
    MasterItemDefinitions_MTX_2023May: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-05.json'),
    MasterItemDefinitions_MTX_2023Nov: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-11.json'),
    MasterItemDefinitions_MTX_2023Oct: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-10.json'),
    MasterItemDefinitions_MTX_2023Sep: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2023-09.json'),
    MasterItemDefinitions_MTX_2024Apr: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-4.json'),
    MasterItemDefinitions_MTX_2024Feb: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-2.json'),
    MasterItemDefinitions_MTX_2024Mar: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-3.json'),
    MasterItemDefinitions_MTX_2024May: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-5.json'),
    MasterItemDefinitions_MTX_2024Season6: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-season6.json'),
    MasterItemDefinitions_MTX_2025Jan: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2025-01.json'),
    MasterItemDefinitions_MTX_Dec2024: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2024-12.json'),
    MasterItemDefinitions_MTX_Feb2025: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2025-02.json'),
    MasterItemDefinitions_MTX_Generic: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_generic.json'),
    MasterItemDefinitions_MTX_Mar2025: getUri<MasterItemDefinitions>('datatables/mtx/javelindata_itemdefinitions_mtx_2025-03.json'),
    MasterItemDefinitions_MakeGood: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_makegoods.json'),
    MasterItemDefinitions_Named: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_named.json'),
    MasterItemDefinitions_Named_Depricated: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_named_depricated.json'),
    MasterItemDefinitions_Omega: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_omega.json'),
    MasterItemDefinitions_PVP: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_pvp.json'),
    MasterItemDefinitions_Playtest: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_playtest.json'),
    MasterItemDefinitions_Quest: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_quest.json'),
    MasterItemDefinitions_SeasonalServer: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_seasonalserver.json'),
    MasterItemDefinitions_Seasons: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_seasons.json'),
    MasterItemDefinitions_Skins: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_skins.json'),
    MasterItemDefinitions_Store: getUri<MasterItemDefinitions>('datatables/javelindata_itemdefinitions_master_store.json')
  },
  MetaAchievementData: {
    MetaAchievementDataTable: getUri<MetaAchievementData>('datatables/javelindata_metaachievements.json')
  },
  MissionData: {
    Missions: getUri<MissionData>('datatables/javelindata_owg_mission.json'),
    TerritoryProgressionMissions: getUri<MissionData>('datatables/javelindata_territoryprogression_missions.json')
  },
  MissionWeightsData: {
    MissionWeights: getUri<MissionWeightsData>('datatables/javelindata_owg_missionweights.json')
  },
  Moonshot: {
    Moonshot: getUri<Moonshot>('datatables/javelindata_moonshot.json')
  },
  MountData: {
    Mounts: getUri<MountData>('datatables/mounts/javelindata_mounts.json')
  },
  MountDyeItemDefinitions: {
    MountDyeItemDefinitions: getUri<MountDyeItemDefinitions>('datatables/javelindata_itemdefinitions_mountdye.json')
  },
  MountItemAppearanceDefinitions: {
    MountItemAppearanceDefinitions: getUri<MountItemAppearanceDefinitions>('datatables/javelindata_itemdefinitions_mountitemappearances.json')
  },
  MountMovementData: {
    MountsMovement: getUri<MountMovementData>('datatables/mounts/javelindata_mount_movement.json')
  },
  MountTypeData: {
    MountTypes: getUri<MountTypeData>('datatables/mounts/javelindata_mounttypes.json')
  },
  MusicalInstrumentSlot: {
    MusicalInstrumentSlotTable: getUri<MusicalInstrumentSlot>('datatables/musicalactions/javelindata_instrumentslots.json')
  },
  MusicalPerformanceRewards: {
    MusicalPerformanceRewardsTable: getUri<MusicalPerformanceRewards>('datatables/musicalactions/javelindata_musicalperformancerewards.json')
  },
  MusicalRanking: {
    MusicalRankingTable: getUri<MusicalRanking>('datatables/musicalactions/javelindata_ranking.json')
  },
  MusicalScoring: {
    MusicalScoringTable: getUri<MusicalScoring>('datatables/musicalactions/javelindata_inputscoring.json')
  },
  MutationDifficultyStaticData: {
    MutationDifficulty: getUri<MutationDifficultyStaticData>('datatables/gamemodemutators/javelindata_mutationdifficulty.json')
  },
  MutationPerksStaticData: {
    MutationPerks: getUri<MutationPerksStaticData>('datatables/gamemodemutators/javelindata_elementalmutationperks.json')
  },
  NPCData: {
    NPCs: getUri<NPCData>('datatables/javelindata_npcs.json'),
    NPCs_02: getUri<NPCData>('datatables/quests/02_brightwood/javelindata_02_npcs.json'),
    NPCs_06: getUri<NPCData>('datatables/quests/06_windsward/javelindata_06_npcs.json'),
    NPCs_09: getUri<NPCData>('datatables/quests/09_firstlight/javelindata_09_npcs.json'),
    NPCs_10: getUri<NPCData>('datatables/quests/10_cutlasskeys/javelindata_10_npcs.json'),
    NPCs_11: getUri<NPCData>('datatables/quests/11_mourningdale/javelindata_11_npcs.json'),
    NPCs_12: getUri<NPCData>('datatables/quests/12_monarchsbluffs/javelindata_12_npcs.json'),
    NPCs_13: getUri<NPCData>('datatables/quests/13_weaversfen/javelindata_13_npcs.json'),
    NPCs_74: getUri<NPCData>('datatables/quests/74_devworld_red/javelindata_74_npcs.json'),
    NPCs_75: getUri<NPCData>('datatables/quests/75_devworld_blue/javelindata_75_npcs.json'),
    NPCs_92: getUri<NPCData>('datatables/quests/92_weaponsandarmor/javelindata_92_npcs.json'),
    NPCs_C01: getUri<NPCData>('datatables/quests/console/c01_starterbeach/javelindata_c01_npcs.json'),
    NPCs_C02A: getUri<NPCData>('datatables/quests/console/c02a_brightwood/javelindata_c02a_npcs.json'),
    NPCs_C03: getUri<NPCData>('datatables/quests/console/c03_greatcleave/javelindata_c03_npcs.json'),
    NPCs_C04A: getUri<NPCData>('datatables/quests/console/c04a_everfall/javelindata_c04a_npcs.json'),
    NPCs_C05: getUri<NPCData>('datatables/quests/console/c05_reekwater/javelindata_c05_npcs.json'),
    NPCs_C06A: getUri<NPCData>('datatables/quests/console/c06a_windsward/javelindata_c06a_npcs.json'),
    NPCs_C07: getUri<NPCData>('datatables/quests/console/c07_shatteredmoutain/javelindata_c07_npcs.json'),
    NPCs_C08: getUri<NPCData>('datatables/quests/console/c08_ebonscalereach/javelindata_c08_npcs.json'),
    NPCs_C09A: getUri<NPCData>('datatables/quests/console/c09a_firstlight/javelindata_c09a_npcs.json'),
    NPCs_C10A: getUri<NPCData>('datatables/quests/console/c10a_cutlasskeys/javelindata_c10a_npcs.json'),
    NPCs_C11: getUri<NPCData>('datatables/quests/console/c11_mourningdale/javelindata_c11_npcs.json'),
    NPCs_C12A: getUri<NPCData>('datatables/quests/console/c12a_monarchsbluffs/javelindata_c12a_npcs.json'),
    NPCs_C13A: getUri<NPCData>('datatables/quests/console/c13a_weaversfen/javelindata_c13a_npcs.json'),
    NPCs_C14: getUri<NPCData>('datatables/quests/console/c14_edengrove/javelindata_c14_npcs.json'),
    NPCs_C15: getUri<NPCData>('datatables/quests/console/c15_restlessshore/javelindata_c15_npcs.json'),
    NPCs_C16: getUri<NPCData>('datatables/quests/console/c16_brimstonesands/javelindata_c16_npcs.json'),
    NPCs_C80: getUri<NPCData>('datatables/quests/console/c80_holidays/javelindata_c80_npcs.json'),
    NPCs_C81: getUri<NPCData>('datatables/quests/console/c81_pushquests/javelindata_c81_npcs.json'),
    NPCs_C91: getUri<NPCData>('datatables/quests/console/c91_fishing/javelindata_c91_npcs.json'),
    NPCs_C94: getUri<NPCData>('datatables/quests/console/c94_mounts/javelindata_c94_npcs.json'),
    NPCs_C95: getUri<NPCData>('datatables/quests/console/c95_seasons/javelindata_c95_npcs.json'),
    NPCs_C95A: getUri<NPCData>('datatables/quests/console/c95a_seasons_s02/javelindata_c95a_npcs.json'),
    NPCs_C95_S04: getUri<NPCData>('datatables/quests/console/c95_seasons_s04/javelindata_c95_s04_npcs.json'),
    NPCs_C98: getUri<NPCData>('datatables/quests/console/c98_factions/javelindata_c98_npcs.json'),
    NPCs_C99A: getUri<NPCData>('datatables/quests/console/c99a_msq/javelindata_c99a_npcs.json'),
    NPCs_C99B: getUri<NPCData>('datatables/quests/console/c99b_msq_brightwood/javelindata_c99b_npcs.json'),
    NPCs_C99C: getUri<NPCData>('datatables/quests/console/c99c_msq_weaversfen/javelindata_c99c_npcs.json'),
    NPCs_C99D: getUri<NPCData>('datatables/quests/console/c99d_msq_greatcleave/javelindata_c99d_npcs.json'),
    NPCs_C99E: getUri<NPCData>('datatables/quests/console/c99e_msq_edengrove/javelindata_c99e_npcs.json'),
    NPCs_C99F: getUri<NPCData>('datatables/quests/console/c99f_msq_ebonscale/javelindata_c99f_npcs.json'),
    NPCs_C99G: getUri<NPCData>('datatables/quests/console/c99g_msq_shattered/javelindata_c99g_npcs.json')
  },
  NotificationData: {
    Notifications: getUri<NotificationData>('datatables/javelindata_notifications.json')
  },
  ObjectiveTasks: {
    ObjectiveTasksDataManager: getUri<ObjectiveTasks>('datatables/javelindata_objectivetasks.json'),
    ObjectiveTasksDataManager_74: getUri<ObjectiveTasks>('datatables/quests/74_devworld_red/javelindata_74_objectivetasks.json'),
    ObjectiveTasksDataManager_75: getUri<ObjectiveTasks>('datatables/quests/75_devworld_blue/javelindata_75_objectivetasks.json'),
    ObjectiveTasksDataManager_C01: getUri<ObjectiveTasks>('datatables/quests/console/c01_starterbeach/javelindata_c01_objectivetasks.json'),
    ObjectiveTasksDataManager_C02A: getUri<ObjectiveTasks>('datatables/quests/console/c02a_brightwood/javelindata_c02a_objectivetasks.json'),
    ObjectiveTasksDataManager_C03: getUri<ObjectiveTasks>('datatables/quests/console/c03_greatcleave/javelindata_c03_objectivetasks.json'),
    ObjectiveTasksDataManager_C04A: getUri<ObjectiveTasks>('datatables/quests/console/c04a_everfall/javelindata_c04a_objectivetasks.json'),
    ObjectiveTasksDataManager_C05: getUri<ObjectiveTasks>('datatables/quests/console/c05_reekwater/javelindata_c05_objectivetasks.json'),
    ObjectiveTasksDataManager_C06A: getUri<ObjectiveTasks>('datatables/quests/console/c06a_windsward/javelindata_c06a_objectivetasks.json'),
    ObjectiveTasksDataManager_C07: getUri<ObjectiveTasks>('datatables/quests/console/c07_shatteredmoutain/javelindata_c07_objectivetasks.json'),
    ObjectiveTasksDataManager_C08: getUri<ObjectiveTasks>('datatables/quests/console/c08_ebonscalereach/javelindata_c08_objectivetasks.json'),
    ObjectiveTasksDataManager_C09A: getUri<ObjectiveTasks>('datatables/quests/console/c09a_firstlight/javelindata_c09a_objectivetasks.json'),
    ObjectiveTasksDataManager_C10A: getUri<ObjectiveTasks>('datatables/quests/console/c10a_cutlasskeys/javelindata_c10a_objectivetasks.json'),
    ObjectiveTasksDataManager_C11: getUri<ObjectiveTasks>('datatables/quests/console/c11_mourningdale/javelindata_c11_objectivetasks.json'),
    ObjectiveTasksDataManager_C12A: getUri<ObjectiveTasks>('datatables/quests/console/c12a_monarchsbluffs/javelindata_c12a_objectivetasks.json'),
    ObjectiveTasksDataManager_C13A: getUri<ObjectiveTasks>('datatables/quests/console/c13a_weaversfen/javelindata_c13a_objectivetasks.json'),
    ObjectiveTasksDataManager_C14: getUri<ObjectiveTasks>('datatables/quests/console/c14_edengrove/javelindata_c14_objectivetasks.json'),
    ObjectiveTasksDataManager_C15: getUri<ObjectiveTasks>('datatables/quests/console/c15_restlessshore/javelindata_c15_objectivetasks.json'),
    ObjectiveTasksDataManager_C16: getUri<ObjectiveTasks>('datatables/quests/console/c16_brimstonesands/javelindata_c16_objectivetasks.json'),
    ObjectiveTasksDataManager_C80: getUri<ObjectiveTasks>('datatables/quests/console/c80_holidays/javelindata_c80_objectivetasks.json'),
    ObjectiveTasksDataManager_C81: getUri<ObjectiveTasks>('datatables/quests/console/c81_pushquests/javelindata_c81_objectivetasks.json'),
    ObjectiveTasksDataManager_C91: getUri<ObjectiveTasks>('datatables/quests/console/c91_fishing/javelindata_c91_objectivetasks.json'),
    ObjectiveTasksDataManager_C94: getUri<ObjectiveTasks>('datatables/quests/console/c94_mounts/javelindata_c94_objectivetasks.json'),
    ObjectiveTasksDataManager_C95: getUri<ObjectiveTasks>('datatables/quests/console/c95_seasons/javelindata_c95_objectivetasks.json'),
    ObjectiveTasksDataManager_C95A: getUri<ObjectiveTasks>('datatables/quests/console/c95a_seasons_s02/javelindata_c95a_objectivetasks.json'),
    ObjectiveTasksDataManager_C95_S04: getUri<ObjectiveTasks>('datatables/quests/console/c95_seasons_s04/javelindata_c95_s04_objectivetasks.json'),
    ObjectiveTasksDataManager_C98: getUri<ObjectiveTasks>('datatables/quests/console/c98_factions/javelindata_c98_objectivetasks.json'),
    ObjectiveTasksDataManager_C99A: getUri<ObjectiveTasks>('datatables/quests/console/c99a_msq/javelindata_c99a_objectivetasks.json'),
    ObjectiveTasksDataManager_C99B: getUri<ObjectiveTasks>('datatables/quests/console/c99b_msq_brightwood/javelindata_c99b_objectivetasks.json'),
    ObjectiveTasksDataManager_C99C: getUri<ObjectiveTasks>('datatables/quests/console/c99c_msq_weaversfen/javelindata_c99c_objectivetasks.json'),
    ObjectiveTasksDataManager_C99D: getUri<ObjectiveTasks>('datatables/quests/console/c99d_msq_greatcleave/javelindata_c99d_objectivetasks.json'),
    ObjectiveTasksDataManager_C99E: getUri<ObjectiveTasks>('datatables/quests/console/c99e_msq_edengrove/javelindata_c99e_objectivetasks.json'),
    ObjectiveTasksDataManager_C99F: getUri<ObjectiveTasks>('datatables/quests/console/c99f_msq_ebonscale/javelindata_c99f_objectivetasks.json'),
    ObjectiveTasksDataManager_C99G: getUri<ObjectiveTasks>('datatables/quests/console/c99g_msq_shattered/javelindata_c99g_objectivetasks.json')
  },
  Objectives: {
    ObjectivesDataManager: getUri<Objectives>('datatables/javelindata_objectives.json'),
    ObjectivesDataManager_74: getUri<Objectives>('datatables/quests/74_devworld_red/javelindata_74_objectives.json'),
    ObjectivesDataManager_75: getUri<Objectives>('datatables/quests/75_devworld_blue/javelindata_75_objectives.json'),
    ObjectivesDataManager_C01: getUri<Objectives>('datatables/quests/console/c01_starterbeach/javelindata_c01_objectives.json'),
    ObjectivesDataManager_C02A: getUri<Objectives>('datatables/quests/console/c02a_brightwood/javelindata_c02a_objectives.json'),
    ObjectivesDataManager_C03: getUri<Objectives>('datatables/quests/console/c03_greatcleave/javelindata_c03_objectives.json'),
    ObjectivesDataManager_C04A: getUri<Objectives>('datatables/quests/console/c04a_everfall/javelindata_c04a_objectives.json'),
    ObjectivesDataManager_C05: getUri<Objectives>('datatables/quests/console/c05_reekwater/javelindata_c05_objectives.json'),
    ObjectivesDataManager_C06A: getUri<Objectives>('datatables/quests/console/c06a_windsward/javelindata_c06a_objectives.json'),
    ObjectivesDataManager_C07: getUri<Objectives>('datatables/quests/console/c07_shatteredmoutain/javelindata_c07_objectives.json'),
    ObjectivesDataManager_C08: getUri<Objectives>('datatables/quests/console/c08_ebonscalereach/javelindata_c08_objectives.json'),
    ObjectivesDataManager_C09A: getUri<Objectives>('datatables/quests/console/c09a_firstlight/javelindata_c09a_objectives.json'),
    ObjectivesDataManager_C10A: getUri<Objectives>('datatables/quests/console/c10a_cutlasskeys/javelindata_c10a_objectives.json'),
    ObjectivesDataManager_C11: getUri<Objectives>('datatables/quests/console/c11_mourningdale/javelindata_c11_objectives.json'),
    ObjectivesDataManager_C12A: getUri<Objectives>('datatables/quests/console/c12a_monarchsbluffs/javelindata_c12a_objectives.json'),
    ObjectivesDataManager_C13A: getUri<Objectives>('datatables/quests/console/c13a_weaversfen/javelindata_c13a_objectives.json'),
    ObjectivesDataManager_C14: getUri<Objectives>('datatables/quests/console/c14_edengrove/javelindata_c14_objectives.json'),
    ObjectivesDataManager_C15: getUri<Objectives>('datatables/quests/console/c15_restlessshore/javelindata_c15_objectives.json'),
    ObjectivesDataManager_C16: getUri<Objectives>('datatables/quests/console/c16_brimstonesands/javelindata_c16_objectives.json'),
    ObjectivesDataManager_C80: getUri<Objectives>('datatables/quests/console/c80_holidays/javelindata_c80_objectives.json'),
    ObjectivesDataManager_C81: getUri<Objectives>('datatables/quests/console/c81_pushquests/javelindata_c81_objectives.json'),
    ObjectivesDataManager_C91: getUri<Objectives>('datatables/quests/console/c91_fishing/javelindata_c91_objectives.json'),
    ObjectivesDataManager_C94: getUri<Objectives>('datatables/quests/console/c94_mounts/javelindata_c94_objectives.json'),
    ObjectivesDataManager_C95: getUri<Objectives>('datatables/quests/console/c95_seasons/javelindata_c95_objectives.json'),
    ObjectivesDataManager_C95A: getUri<Objectives>('datatables/quests/console/c95a_seasons_s02/javelindata_c95a_objectives.json'),
    ObjectivesDataManager_C95_S04: getUri<Objectives>('datatables/quests/console/c95_seasons_s04/javelindata_c95_s04_objectives.json'),
    ObjectivesDataManager_C98: getUri<Objectives>('datatables/quests/console/c98_factions/javelindata_c98_objectives.json'),
    ObjectivesDataManager_C99A: getUri<Objectives>('datatables/quests/console/c99a_msq/javelindata_c99a_objectives.json'),
    ObjectivesDataManager_C99B: getUri<Objectives>('datatables/quests/console/c99b_msq_brightwood/javelindata_c99b_objectives.json'),
    ObjectivesDataManager_C99C: getUri<Objectives>('datatables/quests/console/c99c_msq_weaversfen/javelindata_c99c_objectives.json'),
    ObjectivesDataManager_C99D: getUri<Objectives>('datatables/quests/console/c99d_msq_greatcleave/javelindata_c99d_objectives.json'),
    ObjectivesDataManager_C99E: getUri<Objectives>('datatables/quests/console/c99e_msq_edengrove/javelindata_c99e_objectives.json'),
    ObjectivesDataManager_C99F: getUri<Objectives>('datatables/quests/console/c99f_msq_ebonscale/javelindata_c99f_objectives.json'),
    ObjectivesDataManager_C99G: getUri<Objectives>('datatables/quests/console/c99g_msq_shattered/javelindata_c99g_objectives.json')
  },
  ObjectivesGlobalReleaseData: {
    ObjectivesGlobalRelease: getUri<ObjectivesGlobalReleaseData>('datatables/javelindata_objectivesglobalreleasedata.json')
  },
  OpenWorldBalanceData: {
    OpenWorldPvpBalanceTable: getUri<OpenWorldBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_openworld.json')
  },
  OutpostRushBalanceData: {
    OutpostRushPvpBalanceTable: getUri<OutpostRushBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_outpostrush.json')
  },
  PUGRewardData: {
    PUGRewards: getUri<PUGRewardData>('datatables/javelindata_pugrewards.json')
  },
  ParticleContextualPriorityOverrideData: {
    ParticleContextualPriorityOverrides: getUri<ParticleContextualPriorityOverrideData>('datatables/javelindata_particlepriorityoverrides.json')
  },
  ParticleData: {
    ParticleDataTable: getUri<ParticleData>('datatables/javelindata_particledata.json')
  },
  PerkBucketData: {
    PerkBuckets: getUri<PerkBucketData>('datatables/javelindata_perkbuckets.json')
  },
  PerkData: {
    ItemPerks: getUri<PerkData>('datatables/javelindata_perks.json'),
    ItemPerks_Deprecated: getUri<PerkData>('datatables/javelindata_perks_deprecated.json')
  },
  PerkExclusiveLabelData: {
    PerkExclusiveLabels: getUri<PerkExclusiveLabelData>('datatables/javelindata_perkexclusivelabels.json')
  },
  PlayerMilestoneModalStaticData: {
    PlayerMilestoneModals: getUri<PlayerMilestoneModalStaticData>('datatables/javelindata_playermilestonemodals.json')
  },
  PlayerTitleData: {
    PlayerTitleDataTable: getUri<PlayerTitleData>('datatables/javelindata_playertitles.json')
  },
  ProgressionPointData: {
    ProgressionPoints: getUri<ProgressionPointData>('datatables/javelindata_progressionpointdata.json')
  },
  ProgressionPoolData: {
    ProgressionPools: getUri<ProgressionPoolData>('datatables/javelindata_progressionpools.json')
  },
  PromotionMutationStaticData: {
    PromotionMutation: getUri<PromotionMutationStaticData>('datatables/gamemodemutators/javelindata_promotionmutations.json')
  },
  PvPRankData: {
    PvPXP: getUri<PvPRankData>('datatables/javelindata_pvp_rank.json')
  },
  PvPStoreData: {
    PvPStore: getUri<PvPStoreData>('datatables/pvp_rewardstrack/javelindata_pvp_store_v2.json')
  },
  QuickCourseData: {
    QuickCourse_Master: getUri<QuickCourseData>('datatables/javelindata_quickcourses.json')
  },
  QuickCourseNodeTypeData: {
    QuickCourse_NodeTypes: getUri<QuickCourseNodeTypeData>('datatables/javelindata_quickcoursenodetypes.json')
  },
  RandomEncounterDefinitions: {
    RandomEncounterDefinitions: getUri<RandomEncounterDefinitions>('datatables/javelindata_randomencounters.json')
  },
  RefiningRecipes: {
    RefiningRecipes: getUri<RefiningRecipes>('datatables/javelindata_refiningrecipes.json')
  },
  ResourceItemDefinitions: {
    ResourceItemDefinitions: getUri<ResourceItemDefinitions>('datatables/javelindata_itemdefinitions_resources.json')
  },
  RewardData: {
    Rewards: getUri<RewardData>('datatables/javelindata_rewards.json')
  },
  RewardMilestoneData: {
    RewardMilestones: getUri<RewardMilestoneData>('datatables/javelindata_milestonerewards.json')
  },
  RewardModifierData: {
    RewardModifiers: getUri<RewardModifierData>('datatables/javelindata_rewardmodifiers.json')
  },
  RewardTrackItemData: {
    RewardTrackItems: getUri<RewardTrackItemData>('datatables/pvp_rewardstrack/javelindata_pvp_rewards_v2.json')
  },
  ScheduleData: {
    Schedules: getUri<ScheduleData>('datatables/javelindata_schedules.json')
  },
  SeasonPassRankData: {
    SeasonPass_Season1: getUri<SeasonPassRankData>('datatables/seasonsrewards/season1/javelindata_seasonpassdata_season1.json'),
    SeasonPass_Season2: getUri<SeasonPassRankData>('datatables/seasonsrewards/season2/javelindata_seasonpassdata_season2.json'),
    SeasonPass_Season3: getUri<SeasonPassRankData>('datatables/seasonsrewards/season3/javelindata_seasonpassdata_season3.json'),
    SeasonPass_Season4: getUri<SeasonPassRankData>('datatables/seasonsrewards/season4/javelindata_seasonpassdata_season4.json'),
    SeasonPass_Season5: getUri<SeasonPassRankData>('datatables/seasonsrewards/season5/javelindata_seasonpassdata_season5.json'),
    SeasonPass_Season6: getUri<SeasonPassRankData>('datatables/seasonsrewards/season6/javelindata_seasonpassdata_season6.json'),
    SeasonPass_Season7: getUri<SeasonPassRankData>('datatables/seasonsrewards/season7/javelindata_seasonpassdata_season7.json')
  },
  SeasonsRewardData: {
    SeasonsRewardData_Season1: getUri<SeasonsRewardData>('datatables/seasonsrewards/season1/javelindata_rewarddata_season1.json'),
    SeasonsRewardData_Season2: getUri<SeasonsRewardData>('datatables/seasonsrewards/season2/javelindata_rewarddata_season2.json'),
    SeasonsRewardData_Season3: getUri<SeasonsRewardData>('datatables/seasonsrewards/season3/javelindata_rewarddata_season3.json'),
    SeasonsRewardData_Season4: getUri<SeasonsRewardData>('datatables/seasonsrewards/season4/javelindata_rewarddata_season4.json'),
    SeasonsRewardData_Season5: getUri<SeasonsRewardData>('datatables/seasonsrewards/season5/javelindata_rewarddata_season5.json'),
    SeasonsRewardData_Season6: getUri<SeasonsRewardData>('datatables/seasonsrewards/season6/javelindata_rewarddata_season6.json'),
    SeasonsRewardData_Season7: getUri<SeasonsRewardData>('datatables/seasonsrewards/season7/javelindata_rewarddata_season7.json')
  },
  SeasonsRewardsActivitiesConfig: {
    SeasonsRewardsActivitiesConfig_Season1: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season1/javelindata_seasonsrewardsactivitiesconfig_s1.json'),
    SeasonsRewardsActivitiesConfig_Season2: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season2/javelindata_seasonsrewardsactivitiesconfig_s2.json'),
    SeasonsRewardsActivitiesConfig_Season3: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season3/javelindata_seasonsrewardsactivitiesconfig_s3.json'),
    SeasonsRewardsActivitiesConfig_Season4: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season4/javelindata_seasonsrewardsactivitiesconfig_s4.json'),
    SeasonsRewardsActivitiesConfig_Season5: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season5/javelindata_seasonsrewardsactivitiesconfig_s5.json'),
    SeasonsRewardsActivitiesConfig_Season6: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season6/javelindata_seasonsrewardsactivitiesconfig_s6.json'),
    SeasonsRewardsActivitiesConfig_Season7: getUri<SeasonsRewardsActivitiesConfig>('datatables/seasonsrewards/season7/javelindata_seasonsrewardsactivitiesconfig_s7.json')
  },
  SeasonsRewardsActivitiesTasksData: {
    SeasonsRewardsActivitiesTasksData_Season4: getUri<SeasonsRewardsActivitiesTasksData>('datatables/seasonsrewards/season4/javelindata_seasonsrewardsactivitiestasks_s4.json'),
    SeasonsRewardsActivitiesTasksData_Season5: getUri<SeasonsRewardsActivitiesTasksData>('datatables/seasonsrewards/season5/javelindata_seasonsrewardsactivitiestasks_s5.json'),
    SeasonsRewardsActivitiesTasksData_Season6: getUri<SeasonsRewardsActivitiesTasksData>('datatables/seasonsrewards/season6/javelindata_seasonsrewardsactivitiestasks_s6.json'),
    SeasonsRewardsActivitiesTasksData_Season7: getUri<SeasonsRewardsActivitiesTasksData>('datatables/seasonsrewards/season7/javelindata_seasonsrewardsactivitiestasks_s7.json')
  },
  SeasonsRewardsCardData: {
    SeasonsRewardsCardData_Season1: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season1/javelindata_seasonsrewardscarddata_s1.json'),
    SeasonsRewardsCardData_Season2: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season2/javelindata_seasonsrewardscarddata_s2.json'),
    SeasonsRewardsCardData_Season3: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season3/javelindata_seasonsrewardscarddata_s3.json'),
    SeasonsRewardsCardData_Season4: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season4/javelindata_seasonsrewardscarddata_s4.json'),
    SeasonsRewardsCardData_Season5: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season5/javelindata_seasonsrewardscarddata_s5.json'),
    SeasonsRewardsCardData_Season6: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season6/javelindata_seasonsrewardscarddata_s6.json'),
    SeasonsRewardsCardData_Season7: getUri<SeasonsRewardsCardData>('datatables/seasonsrewards/season7/javelindata_seasonsrewardscarddata_s7.json')
  },
  SeasonsRewardsCardTemplates: {
    SeasonsRewardsCardTemplates_Season1: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season1/javelindata_seasonsrewardscardtemplates_s1.json'),
    SeasonsRewardsCardTemplates_Season2: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season2/javelindata_seasonsrewardscardtemplates_s2.json'),
    SeasonsRewardsCardTemplates_Season3: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season3/javelindata_seasonsrewardscardtemplates_s3.json'),
    SeasonsRewardsCardTemplates_Season4: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season4/javelindata_seasonsrewardscardtemplates_s4.json'),
    SeasonsRewardsCardTemplates_Season5: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season5/javelindata_seasonsrewardscardtemplates_s5.json'),
    SeasonsRewardsCardTemplates_Season6: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season6/javelindata_seasonsrewardscardtemplates_s6.json'),
    SeasonsRewardsCardTemplates_Season7: getUri<SeasonsRewardsCardTemplates>('datatables/seasonsrewards/season7/javelindata_seasonsrewardscardtemplates_s7.json')
  },
  SeasonsRewardsChapterData: {
    SeasonsRewardsChapterData_Season1: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season1/javelindata_chapterdata_season1.json'),
    SeasonsRewardsChapterData_Season2: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season2/javelindata_chapterdata_season2.json'),
    SeasonsRewardsChapterData_Season3: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season3/javelindata_chapterdata_season3.json'),
    SeasonsRewardsChapterData_Season4: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season4/javelindata_chapterdata_season4.json'),
    SeasonsRewardsChapterData_Season5: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season5/javelindata_chapterdata_season5.json'),
    SeasonsRewardsChapterData_Season6: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season6/javelindata_chapterdata_season6.json'),
    SeasonsRewardsChapterData_Season7: getUri<SeasonsRewardsChapterData>('datatables/seasonsrewards/season7/javelindata_chapterdata_season7.json')
  },
  SeasonsRewardsJourneyData: {
    SeasonsRewardsJourneyData_Season1: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season1/javelindata_seasonsrewardsjourney_season1.json'),
    SeasonsRewardsJourneyData_Season2: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season2/javelindata_seasonsrewardsjourney_season2.json'),
    SeasonsRewardsJourneyData_Season3: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season3/javelindata_seasonsrewardsjourney_season3.json'),
    SeasonsRewardsJourneyData_Season4: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season4/javelindata_seasonsrewardsjourney_season4.json'),
    SeasonsRewardsJourneyData_Season5: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season5/javelindata_seasonsrewardsjourney_season5.json'),
    SeasonsRewardsJourneyData_Season6: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season6/javelindata_seasonsrewardsjourney_season6.json'),
    SeasonsRewardsJourneyData_Season7: getUri<SeasonsRewardsJourneyData>('datatables/seasonsrewards/season7/javelindata_seasonsrewardsjourney_season7.json')
  },
  SeasonsRewardsSeasonData: {
    SeasonsRewardsSeasonDataTable: getUri<SeasonsRewardsSeasonData>('datatables/seasonsrewards/javelindata_seasondata.json')
  },
  SeasonsRewardsStats: {
    SeasonsRewardsStats: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats.json'),
    SeasonsRewardsStats_Achievements: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_achievements.json'),
    SeasonsRewardsStats_ActivityCard: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_activitycard.json'),
    SeasonsRewardsStats_Arena: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_arena.json'),
    SeasonsRewardsStats_CategoricalProgression: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_categoricalprogression.json'),
    SeasonsRewardsStats_Combat: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_combat.json'),
    SeasonsRewardsStats_CommitResource: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_commitresource.json'),
    SeasonsRewardsStats_Consume: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_consume.json'),
    SeasonsRewardsStats_Craft: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_craft.json'),
    SeasonsRewardsStats_Duel: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_duel.json'),
    SeasonsRewardsStats_EquipItem: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_equipitem.json'),
    SeasonsRewardsStats_Expedition: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_expedition.json'),
    SeasonsRewardsStats_FactionControl: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_factioncontrol.json'),
    SeasonsRewardsStats_Fishing: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_fishing.json'),
    SeasonsRewardsStats_GameEvent: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_gameevent.json'),
    SeasonsRewardsStats_Gather: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_gather.json'),
    SeasonsRewardsStats_JourneyTask: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_journeytask.json'),
    SeasonsRewardsStats_Kill: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_kill.json'),
    SeasonsRewardsStats_Level: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_level.json'),
    SeasonsRewardsStats_OutpostRush: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_outpostrush.json'),
    SeasonsRewardsStats_Quest: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_quest.json'),
    SeasonsRewardsStats_Salvage: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_salvage.json'),
    SeasonsRewardsStats_Song: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_song.json'),
    SeasonsRewardsStats_War: getUri<SeasonsRewardsStats>('datatables/seasonsrewards/javelindata_seasonsrewardsstats_war.json')
  },
  SeasonsRewardsTasks: {
    SeasonsRewardsTasks: getUri<SeasonsRewardsTasks>('datatables/seasonsrewards/javelindata_seasonsrewardstasks.json')
  },
  SimpleTreeCategoryData: {
    MetaAchievementCategoryDataTable: getUri<SimpleTreeCategoryData>('datatables/javelindata_metaachievements_categories.json'),
    PlayerTitleCategoryDataTable: getUri<SimpleTreeCategoryData>('datatables/javelindata_playertitles_categories.json')
  },
  SkillData: {
    SkillDataTable: getUri<SkillData>('datatables/javelindata_skills.json')
  },
  SkillExperienceData: {
    SkillExperienceDataTable: getUri<SkillExperienceData>('datatables/javelindata_skillexperience.json')
  },
  Socketables: {
    Socketables: getUri<Socketables>('datatables/javelindata_socketables.json')
  },
  SongBookData: {
    SongBookData: getUri<SongBookData>('datatables/musicalactions/javelindata_songbook.json')
  },
  SongBookSheets: {
    SongBookSheets: getUri<SongBookSheets>('datatables/musicalactions/javelindata_songbooksheets.json')
  },
  SpecializationDefinitions: {
    Specialization: getUri<SpecializationDefinitions>('datatables/javelindata_specializationlevels.json')
  },
  SpellData: {
    SpellDataTable: getUri<SpellData>('datatables/javelindata_spelltable.json'),
    SpellDataTable_AI: getUri<SpellData>('datatables/javelindata_spelltable_ai.json'),
    SpellDataTable_Blunderbuss: getUri<SpellData>('datatables/javelindata_spelltable_blunderbuss.json'),
    SpellDataTable_Bow: getUri<SpellData>('datatables/javelindata_spelltable_bow.json'),
    SpellDataTable_Conqueror: getUri<SpellData>('datatables/javelindata_spelltable_conquerorsitems.json'),
    SpellDataTable_FireMagic: getUri<SpellData>('datatables/javelindata_spelltable_firemagic.json'),
    SpellDataTable_Flail: getUri<SpellData>('datatables/javelindata_spelltable_flail.json'),
    SpellDataTable_Global: getUri<SpellData>('datatables/javelindata_spelltable_global.json'),
    SpellDataTable_GreatAxe: getUri<SpellData>('datatables/javelindata_spelltable_greataxe.json'),
    SpellDataTable_Greatsword: getUri<SpellData>('datatables/javelindata_spelltable_greatsword.json'),
    SpellDataTable_Hatchet: getUri<SpellData>('datatables/javelindata_spelltable_hatchet.json'),
    SpellDataTable_IceMagic: getUri<SpellData>('datatables/javelindata_spelltable_icemagic.json'),
    SpellDataTable_LifeMagic: getUri<SpellData>('datatables/javelindata_spelltable_lifemagic.json'),
    SpellDataTable_Musket: getUri<SpellData>('datatables/javelindata_spelltable_musket.json'),
    SpellDataTable_Rapier: getUri<SpellData>('datatables/javelindata_spelltable_rapier.json'),
    SpellDataTable_Runes: getUri<SpellData>('datatables/javelindata_spelltable_runes.json'),
    SpellDataTable_Spear: getUri<SpellData>('datatables/javelindata_spelltable_spear.json'),
    SpellDataTable_Sword: getUri<SpellData>('datatables/javelindata_spelltable_sword.json'),
    SpellDataTable_Throwables: getUri<SpellData>('datatables/javelindata_spelltable_throwables.json'),
    SpellDataTable_VoidGauntlet: getUri<SpellData>('datatables/javelindata_spelltable_voidgauntlet.json'),
    SpellDataTable_WarHammer: getUri<SpellData>('datatables/javelindata_spelltable_warhammer.json')
  },
  StaminaData: {
    StaminaCosts_Damned: getUri<StaminaData>('datatables/javelindata_staminacosts_damned.json'),
    StaminaCosts_Player: getUri<StaminaData>('datatables/javelindata_staminacosts_player.json')
  },
  StatMultiplierData: {
    StatMultiplierTable: getUri<StatMultiplierData>('datatables/javelindata_statmultipliers.json')
  },
  StatusEffectCategoryData: {
    StatusEffectCategories: getUri<StatusEffectCategoryData>('datatables/javelindata_statuseffectcategories.json')
  },
  StatusEffectData: {
    StatusEffects: getUri<StatusEffectData>('datatables/javelindata_statuseffects.json'),
    StatusEffects_AI: getUri<StatusEffectData>('datatables/javelindata_statuseffects_ai.json'),
    StatusEffects_Blunderbuss: getUri<StatusEffectData>('datatables/javelindata_statuseffects_blunderbuss.json'),
    StatusEffects_Bow: getUri<StatusEffectData>('datatables/javelindata_statuseffects_bow.json'),
    StatusEffects_Common: getUri<StatusEffectData>('datatables/javelindata_statuseffects_common.json'),
    StatusEffects_ConquerorsItems: getUri<StatusEffectData>('datatables/javelindata_statuseffects_conquerersitems.json'),
    StatusEffects_Firestaff: getUri<StatusEffectData>('datatables/javelindata_statuseffects_firestaff.json'),
    StatusEffects_Flail: getUri<StatusEffectData>('datatables/javelindata_statuseffects_flail.json'),
    StatusEffects_Greataxe: getUri<StatusEffectData>('datatables/javelindata_statuseffects_greataxe.json'),
    StatusEffects_Greatsword: getUri<StatusEffectData>('datatables/javelindata_statuseffects_greatsword.json'),
    StatusEffects_Hatchet: getUri<StatusEffectData>('datatables/javelindata_statuseffects_hatchet.json'),
    StatusEffects_IceMagic: getUri<StatusEffectData>('datatables/javelindata_statuseffects_icemagic.json'),
    StatusEffects_Items: getUri<StatusEffectData>('datatables/javelindata_statuseffects_item.json'),
    StatusEffects_Lifestaff: getUri<StatusEffectData>('datatables/javelindata_statuseffects_lifestaff.json'),
    StatusEffects_Musket: getUri<StatusEffectData>('datatables/javelindata_statuseffects_musket.json'),
    StatusEffects_Perks: getUri<StatusEffectData>('datatables/javelindata_statuseffects_perks.json'),
    StatusEffects_Rapier: getUri<StatusEffectData>('datatables/javelindata_statuseffects_rapier.json'),
    StatusEffects_Runes: getUri<StatusEffectData>('datatables/javelindata_statuseffects_runes.json'),
    StatusEffects_Spear: getUri<StatusEffectData>('datatables/javelindata_statuseffects_spear.json'),
    StatusEffects_Sword: getUri<StatusEffectData>('datatables/javelindata_statuseffects_sword.json'),
    StatusEffects_VoidGauntlet: getUri<StatusEffectData>('datatables/javelindata_statuseffects_voidgauntlet.json'),
    StatusEffects_Warhammer: getUri<StatusEffectData>('datatables/javelindata_statuseffects_warhammer.json')
  },
  StoreCategoryProperties: {
    StoreCategoryPropertiesTable: getUri<StoreCategoryProperties>('datatables/javelindata_storecategories.json')
  },
  StoreProductData: {
    StoreProductData: getUri<StoreProductData>('datatables/javelindata_storeproducts.json')
  },
  StoryProgressData: {
    StoryProgress: getUri<StoryProgressData>('datatables/javelindata_storyprogress.json')
  },
  StructureFootprintData: {
    WallFootprint: getUri<StructureFootprintData>('datatables/structuredata/javelindata_wallfootprint.json')
  },
  StructurePieceData: {
    T0_Wall_Pieces: getUri<StructurePieceData>('datatables/structuredata/javelindata_t0_wall_pieces.json')
  },
  TerritoryDefinition: {
    AreaDefinitions: getUri<TerritoryDefinition>('datatables/javelindata_areadefinitions.json'),
    ArenaDefinitions: getUri<TerritoryDefinition>('datatables/arenas/javelindata_arenadefinitions.json'),
    DarknessDefinitions: getUri<TerritoryDefinition>('datatables/javelindata_darknessdefinitions.json'),
    DefendObjectDefinitions: getUri<TerritoryDefinition>('datatables/javelindata_defendobjectdefinitions.json'),
    InvasionDefinitions: getUri<TerritoryDefinition>('datatables/invasion/javelindata_invasiondefinitions.json'),
    POITriggerVolumes: getUri<TerritoryDefinition>('datatables/javelindata_triggervolumepois.json'),
    PointsOfInterest_01_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_01_02.json'),
    PointsOfInterest_01_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_01_03.json'),
    PointsOfInterest_02_00: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_02_00.json'),
    PointsOfInterest_02_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_02_02.json'),
    PointsOfInterest_02_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_02_03.json'),
    PointsOfInterest_02_04: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_02_04.json'),
    PointsOfInterest_03_00: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_03_00.json'),
    PointsOfInterest_03_01: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_03_01.json'),
    PointsOfInterest_03_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_03_02.json'),
    PointsOfInterest_03_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_03_03.json'),
    PointsOfInterest_03_04: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_03_04.json'),
    PointsOfInterest_04_00: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_04_00.json'),
    PointsOfInterest_04_01: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_04_01.json'),
    PointsOfInterest_04_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_04_02.json'),
    PointsOfInterest_04_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_04_03.json'),
    PointsOfInterest_04_04: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_04_04.json'),
    PointsOfInterest_05_01: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_05_01.json'),
    PointsOfInterest_05_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_05_02.json'),
    PointsOfInterest_05_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_05_03.json'),
    PointsOfInterest_05_04: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_05_04.json'),
    PointsOfInterest_06_02: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_06_02.json'),
    PointsOfInterest_06_03: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_06_03.json'),
    PointsOfInterest_06_04: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_06_04.json'),
    PointsOfInterest_DevWorld: getUri<TerritoryDefinition>('datatables/pointofinterestdefinitions/javelindata_poidefinitions_devworld.json'),
    Territories: getUri<TerritoryDefinition>('datatables/javelindata_territorydefinitions.json')
  },
  TerritoryProgressionData: {
    TerritoryProgression: getUri<TerritoryProgressionData>('datatables/javelindata_territoryprogression.json')
  },
  TerritoryUpkeepDefinition: {
    TerritoryUpkeep: getUri<TerritoryUpkeepDefinition>('datatables/javelindata_territorygovernance.json')
  },
  ThrowableItemDefinitions: {
    ThrowableItemDefinitions: getUri<ThrowableItemDefinitions>('datatables/javelindata_itemdefinitions_throwables.json')
  },
  TimelineRegistryEntryData: {
    GenericTimelineRegistryEntry: getUri<TimelineRegistryEntryData>('datatables/timelines/javelindata_generictimelines.json'),
    TimelineRegistryEntry: getUri<TimelineRegistryEntryData>('datatables/timelines/javelindata_npc_votimelines.json'),
    WhisperTimelineRegistryEntry: getUri<TimelineRegistryEntryData>('datatables/timelines/javelindata_whispertimelines.json')
  },
  TradeSkillPostCapData: {
    TradeSkillPostCap: getUri<TradeSkillPostCapData>('datatables/javelindata_tradeskillpostcap.json')
  },
  TradeskillRankData: {
    Arcana: getUri<TradeskillRankData>('datatables/javelindata_tradeskillarcana.json'),
    Armoring: getUri<TradeskillRankData>('datatables/javelindata_tradeskillarmoring.json'),
    AzothStaff: getUri<TradeskillRankData>('datatables/javelindata_tradeskillazothstaff.json'),
    Cooking: getUri<TradeskillRankData>('datatables/javelindata_tradeskillcooking.json'),
    Engineering: getUri<TradeskillRankData>('datatables/javelindata_tradeskillengineering.json'),
    Fishing: getUri<TradeskillRankData>('datatables/javelindata_tradeskillfishing.json'),
    Furnishing: getUri<TradeskillRankData>('datatables/javelindata_tradeskillfurnishing.json'),
    Harvesting: getUri<TradeskillRankData>('datatables/javelindata_tradeskillharvesting.json'),
    Jewelcrafting: getUri<TradeskillRankData>('datatables/javelindata_tradeskilljewelcrafting.json'),
    Leatherworking: getUri<TradeskillRankData>('datatables/javelindata_tradeskillleatherworking.json'),
    Logging: getUri<TradeskillRankData>('datatables/javelindata_tradeskilllogging.json'),
    Mining: getUri<TradeskillRankData>('datatables/javelindata_tradeskillmining.json'),
    Musician: getUri<TradeskillRankData>('datatables/javelindata_tradeskillmusician.json'),
    Riding: getUri<TradeskillRankData>('datatables/javelindata_tradeskillriding.json'),
    Skinning: getUri<TradeskillRankData>('datatables/javelindata_tradeskillskinning.json'),
    Smelting: getUri<TradeskillRankData>('datatables/javelindata_tradeskillsmelting.json'),
    Stonecutting: getUri<TradeskillRankData>('datatables/javelindata_tradeskillstonecutting.json'),
    Weaponsmithing: getUri<TradeskillRankData>('datatables/javelindata_tradeskillweaponsmithing.json'),
    Weaving: getUri<TradeskillRankData>('datatables/javelindata_tradeskillweaving.json'),
    Woodworking: getUri<TradeskillRankData>('datatables/javelindata_tradeskillwoodworking.json')
  },
  TutorialConditionData: {
    TutorialConditionData: getUri<TutorialConditionData>('datatables/playertutorials/javelindata_tutorialtriggerconditionsdata.json')
  },
  TutorialContentData: {
    TutorialContentData: getUri<TutorialContentData>('datatables/playertutorials/javelindata_tutorialcontentdata.json')
  },
  TutorialData: {
    TutorialData: getUri<TutorialData>('datatables/playertutorials/javelindata_tutorialdata.json')
  },
  TwitchDropsStatDefinitions: {
    TwitchDropsStatDefinitions: getUri<TwitchDropsStatDefinitions>('datatables/javelindata_twitchdrops.json')
  },
  TwitchTagsStatDefinitions: {
    TwitchTagsStatDefinitions: getUri<TwitchTagsStatDefinitions>('datatables/javelindata_twitchtags.json')
  },
  VariationData: {
    AI: getUri<VariationData>('datatables/javelindata_variations_ai.json'),
    CutTrunks: getUri<VariationData>('datatables/javelindata_variations_cuttrunks.json'),
    Destructible_Walls: getUri<VariationData>('datatables/javelindata_destructiblewalls.json'),
    Gatherables_NPCRescue_01: getUri<VariationData>('datatables/javelindata_variations_gatherables_npcrescue.json'),
    LockedInteractGatherables: getUri<VariationData>('datatables/javelindata_variations_locked_interact_gatherables.json'),
    LootContainers: getUri<VariationData>('datatables/javelindata_variations_lootcontainers.json'),
    NPC: getUri<VariationData>('datatables/javelindata_variations_npcs.json'),
    NPC_ClientPathing_Walkaway: getUri<VariationData>('datatables/javelindata_variations_npcs_clientpathing_walkaway.json'),
    NPC_Walkaway: getUri<VariationData>('datatables/javelindata_variations_npcs_walkaway.json'),
    RandomEncounter_Vitals: getUri<VariationData>('datatables/javelindata_variations_randomencounters.json')
  },
  VariationDataGatherable: {
    Gatherable_Alchemy: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_alchemy.json'),
    Gatherable_Bushes: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_bushes.json'),
    Gatherable_Cinematic: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_cinematic.json'),
    Gatherable_Cyclic: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_cyclic.json'),
    Gatherable_Darkness: getUri<VariationDataGatherable>('datatables/javelindata_variations_darkness.json'),
    Gatherable_Essences: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_essences.json'),
    Gatherable_Holiday: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_holiday.json'),
    Gatherable_Holiday_Proximity: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_holiday_proximity.json'),
    Gatherable_Items: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_items.json'),
    Gatherable_LockedGates: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_lockedgates.json'),
    Gatherable_Logs: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_logs.json'),
    Gatherable_LootContainers: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_lootcontainers.json'),
    Gatherable_Minerals: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_minerals.json'),
    Gatherable_POIObjects: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_poiobjects.json'),
    Gatherable_Plants: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_plants.json'),
    Gatherable_Quest: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_quest.json'),
    Gatherable_Quest_AncientGlyph: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_quest_ancientglyph.json'),
    Gatherable_Quest_Damageable: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_quest_damageable.json'),
    Gatherable_Quest_Proximity: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_quest_proximity.json'),
    Gatherable_Stones: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_stones.json'),
    Gatherable_Trees: getUri<VariationDataGatherable>('datatables/javelindata_variations_gatherables_trees.json')
  },
  VitalsBaseData: {
    BaseVitals_Common: getUri<VitalsBaseData>('datatables/vitalstables/javelindata_basevitals_common.json'),
    BaseVitals_CutlassKeys: getUri<VitalsBaseData>('datatables/vitalstables/javelindata_basevitals_cutlasskeys.json'),
    BaseVitals_FirstLight: getUri<VitalsBaseData>('datatables/vitalstables/javelindata_basevitals_firstlight.json'),
    BaseVitals_Player: getUri<VitalsBaseData>('datatables/vitalstables/javelindata_basevitals_player.json'),
    BaseVitals_Raid_CutlassKeys: getUri<VitalsBaseData>('datatables/vitalstables/raids/javelindata_basevitals_raid_cutlasskeys.json')
  },
  VitalsCategoryData: {
    VitalsCategories: getUri<VitalsCategoryData>('datatables/javelindata_vitalscategories.json')
  },
  VitalsData: {
    Vitals_FtW: getUri<VitalsData>('datatables/ftw/javelindata_vitals_ftw.json')
  },
  VitalsLevelData: {
    VitalsLevels: getUri<VitalsLevelData>('datatables/javelindata_vitalsleveldata.json')
  },
  VitalsLevelVariantData: {
    LevelVariantVitals_Common: getUri<VitalsLevelVariantData>('datatables/vitalstables/javelindata_levelvariantvitals_common.json'),
    LevelVariantVitals_CutlassKeys: getUri<VitalsLevelVariantData>('datatables/vitalstables/javelindata_levelvariantvitals_cutlasskeys.json'),
    LevelVariantVitals_FirstLight: getUri<VitalsLevelVariantData>('datatables/vitalstables/javelindata_levelvariantvitals_firstlight.json'),
    LevelVariantVitals_Player: getUri<VitalsLevelVariantData>('datatables/vitalstables/javelindata_levelvariantvitals_player.json'),
    Vitals_Raid_CutlassKeys: getUri<VitalsLevelVariantData>('datatables/vitalstables/raids/javelindata_levelvariantvitals_raid_cutlasskeys.json')
  },
  VitalsModifierData: {
    VitalsModifiers: getUri<VitalsModifierData>('datatables/javelindata_vitalsmodifierdata.json')
  },
  WarBalanceData: {
    WarPvpBalanceTable: getUri<WarBalanceData>('datatables/pvpbalancetables/javelindata_pvpbalance_war.json')
  },
  WarboardStatDefinitions: {
    ORWarboardStatDefinitions: getUri<WarboardStatDefinitions>('datatables/javelindata_orwarboardaggregates.json'),
    PvPArenaWarboardStatDefinitions: getUri<WarboardStatDefinitions>('datatables/javelindata_pvparenawarboardaggregates.json'),
    WarboardStatDefinitions: getUri<WarboardStatDefinitions>('datatables/javelindata_warboardaggregates.json')
  },
  WeaponAccessoryDefinitions: {
    WeaponAccessoryDefinitions: getUri<WeaponAccessoryDefinitions>('datatables/javelindata_itemdefinitions_weaponaccessories.json')
  },
  WeaponAppearanceDefinitions: {
    InstrumentsAppearanceDefinitions: getUri<WeaponAppearanceDefinitions>('datatables/javelindata_itemdefinitions_instrumentsappearances.json'),
    WeaponAppearanceDefinitions: getUri<WeaponAppearanceDefinitions>('datatables/javelindata_itemdefinitions_weaponappearances.json'),
    WeaponAppearanceDefinitions_MountAttachments: getUri<WeaponAppearanceDefinitions>('datatables/javelindata_itemdefinitions_weaponappearances_mountattachments.json')
  },
  WeaponEffectData: {
    WeaponEffects: getUri<WeaponEffectData>('datatables/javelindata_weaponeffects.json')
  },
  WeaponItemDefinitions: {
    RuneItemDefinitions: getUri<WeaponItemDefinitions>('datatables/javelindata_itemdefinitions_runes.json'),
    WeaponItemDefinitions: getUri<WeaponItemDefinitions>('datatables/javelindata_itemdefinitions_weapons.json')
  },
  WhisperData: {
    WhisperDataManager: getUri<WhisperData>('datatables/javelindata_whisperdata.json')
  },
  WhisperVfxData: {
    WhisperVFXData: getUri<WhisperVfxData>('datatables/javelindata_whispervfxdata.json')
  },
  WorldEventCategoryData: {
    WorldEventCategories: getUri<WorldEventCategoryData>('datatables/javelindata_worldeventcategories.json')
  },
  WorldEventRuleData: {
    WorldEventRules: getUri<WorldEventRuleData>('datatables/javelindata_worldeventrules.json')
  }
}
