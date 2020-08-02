import React from 'react'

import {
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';

import GoalDay from '../GoalDay'
import handleFromActionsToButtonTask from '../../handlers/ActionsTask'
import {styles} from './styles'

const month = new Date().getMonth()
const allMonth = [
  {month: 'Enero'}, {month: 'Febrero'},{month: 'Marzo'},{month: 'Abril'},{month: 'Mayo'},{month: 'Junio'},{month: 'Julio'},
  {month: 'Agosto'},{month: 'Septiembre'},{month: 'Octubre'},{month: 'Noviembre'},{month: 'Diciembre'}
]
const currentM =allMonth.find((_, i) => i === month)
const currentMonth = currentM.month

const DisplayAllGoal = ({allMonthGoal,setAllMonthGoal, dailyTaskItem, setDailyTaskItem, storage}) => {
        console.log('allMonthGoal',allMonthGoal)

  return (
    <View>
      {dailyTaskItem && dailyTaskItem.map((dailyGoal, i) => {
        const getStatus = () => {
          const {success, failed} = dailyGoal
          if (success) return 'success'
          if (failed) return 'failed'
          return null
        }
        return (
          <View key={i}>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.goalDayContainer}>
                  <ScrollView>
                    <GoalDay
                      status={getStatus()}
                      goalDay={dailyGoal.name}
                      onDelete={() => {
                        return handleFromActionsToButtonTask({
                          item: dailyGoal,
                          storage,
                          index: dailyGoal.id,
                          action: 'delete',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal,
                          setAllMonthGoal
                        })
                      }}
                      onSuccess={() => {
                        return handleFromActionsToButtonTask({
                          item: dailyGoal,
                          storage,
                          index: dailyGoal.id,
                          action: 'success',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal,
                          setAllMonthGoal
                        })
                      }
                    }
                      onFailed={() => {
                        return handleFromActionsToButtonTask({
                          item: dailyGoal,
                          storage,
                          index: dailyGoal.id,
                          action: 'failed',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal,
                          setAllMonthGoal
                        })
                      }
                    }
                    />
                  </ScrollView>
                </View>
            </SafeAreaView>
          </View>
        )
      })}
    </View>
  )
}

export default DisplayAllGoal