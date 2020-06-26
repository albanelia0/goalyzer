import React from 'react'

import {
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';

import GoalDay from '../GoalDay'

import {styles} from './styles'

const DisplayAllGoal = ({dailyTaskItem}) => {
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
                      onDelete={() => handleFromActionsToButtonTask(
                        item={dailyGoal},index={i}, action='delete', useToSet={setDailyTaskItem},dailyTaskItem)}
                      onSuccess={() => handleFromActionsToButtonTask(
                        item={dailyGoal},index={i}, action='success',useToSet={setDailyTaskItem},dailyTaskItem)}
                      onFailed={() => handleFromActionsToButtonTask(
                        item={dailyGoal},index={i}, action='failed',useToSet={setDailyTaskItem},dailyTaskItem)}
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