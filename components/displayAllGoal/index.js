import React from 'react'

import {
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';

import GoalDay from '../GoalDay'
import handleFromActionsToButtonTask from '../../handlers/ActionsTask'
import {styles} from './styles'

const DisplayAllGoal = ({allMonthGoal, dailyTaskItem, setDailyTaskItem, storage}) => {
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
                          index: i,
                          action: 'delete',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal
                        })
                      }}
                      onSuccess={() => {
                        return handleFromActionsToButtonTask({
                          item: dailyGoal,
                          storage,
                          index: i,
                          action: 'success',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal
                        })
                      }
                    }
                      onFailed={() => {
                        return handleFromActionsToButtonTask({
                          item: dailyGoal,
                          storage,
                          index: i,
                          action: 'failed',
                          setDailyTaskItem,
                          dailyTaskItem,
                          allMonthGoal
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