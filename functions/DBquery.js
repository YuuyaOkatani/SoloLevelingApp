import { MMKV } from 'react-native-mmkv';
import { questoes } from './System';


export class DBquery {

    storage = new MMKV()



    constructor() {

    }

    // getStats(currentLevelMateria, currentXPMateria) {
    //     this.currentLevelMateria = currentLevelMateria
    //     this.currentXPMateria = currentXPMateria
    // }

    checkStats() {
        let levels = this.setScore();
        let data2 = []
        levels.forEach(level => {
            if (level.level != undefined) {

                data2.push({
                    name: `${level.materia}`,
                    value: level.value,
                })
  

            }
        })
        // data2.forEach(level => {
        //     console.log(level.name);
        //     console.log(level.value);

        // })

        // data3 = levels.map((quest) => ({
        //     name: quest.materia, 
        //     value: 0.5,
        // }))

        let data3 = levels.map((level) =>
        ({
            name: `${level.materia} - Lvl.${level?.level}`,
            value: level.value
        })
        )
        return data2


    }
    setScore() {
        const completedQuests = this.getQuests('completedQuests')

        let stackLevels = []




        questoes.forEach((quest) => {
            stackLevels.push({
                materia: quest.materia,
                value: 0,
                totalScore: 0,
                level: 0,
                color1: quest.color1,
                color2: quest.color2,
            })
        })

        stackLevels.push({
            materia: 'Todos',
            value: 0,
            totalScore: 0
        })


        completedQuests.forEach(completedQuest => {
      
            stackLevels.forEach(materia => {
                if (materia.materia === completedQuest.topic) {
                    materia.totalScore += completedQuest.reward
                    let currentXPMateria = materia.totalScore
                    let currentLevelMateria = 1
                    let nedeedXP = 100 * currentLevelMateria

                    while (currentXPMateria >= currentLevelMateria * 100) {
                        currentLevelMateria += 1
                        currentXPMateria -= nedeedXP
                        nedeedXP = 100 * currentLevelMateria
              






                    }
                    materia.level = currentLevelMateria
                    materia.value = currentXPMateria / nedeedXP
                    materia.value = parseFloat(materia.value.toFixed(2))
                }
            })

            stackLevels[stackLevels.length - 1].totalScore += completedQuest.reward

        })



        this.storage.set('levels', JSON.stringify(stackLevels))

        const result = this.getQuests('levels')



        return result


    }

    deleteAll() {
        this.storage.clearAll()

    }
    getMateria(className) {
        let query = {}
        questoes.forEach(quest => {

            if (quest.materia === className) {
                query = quest
            }




        })
      
        return query
    }
    getQuests(collectionName) {

        const collectionString = this.storage.getString(collectionName)

        const Quests = collectionString ? JSON.parse(collectionString) : [];



        return Quests



    }

    getQuestTopic(QuestList) {
        return QuestList.topico

    }

    setQuests(Quest, QuestList) {
        this.storage.set(Quest.class, JSON.stringify(QuestList))
    }

    addQuest(quest, questList) {

        const collectionString = this.storage.getString(questList)

        let Quests = []
        Quests = this.getQuests(questList);


        Quests.push(quest);

        this.storage.set(questList, JSON.stringify(Quests));


    }

    updateQuests(Quest, name, description, questList, completedResponse, quantity, questTopic, materia) {

        let updatedQuest = {
            ...Quest,
            name: name,
            description: description,
            class: questList,
            completed: completedResponse,
            quantity: quantity,
            topic: materia,
            subTopic: questTopic,
            reward: quantity * questTopic.xp
        }

  


        const Quests = this.getQuests(Quest.class)



        let updatedQuestList = []

        if (Quest.class !== questList) {
            // Quest.class != 'dailyQuests' &&
            this.deleteQuest(Quest);
            this.addQuest(updatedQuest, questList);

        }
        else {

            updatedQuestList = Quests.map(quest => {
                if (quest.id === Quest.id) {
                    quest = updatedQuest
                    return quest
                }

            })

            this.storage.set(questList, JSON.stringify(updatedQuestList));
        }










    }

    deleteQuest(Quest) {
        const Quests = this.getQuests(Quest.class)


        let updatedQuestList = Quests.filter(quest => quest.id !== Quest.id)


        this.storage.set(Quest.class, JSON.stringify(updatedQuestList));
    }
}
