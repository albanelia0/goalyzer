export default function giveStatusFromSquare(arrayAllTask) {
  if (arrayAllTask.length !== 0) {
      const goalAlmostSuccess = arrayAllTask.some(dayStatus => dayStatus.success === true)
      const greenStatus = arrayAllTask.every(dayStatus => dayStatus.success === true)
      const redStatus = arrayAllTask.every(dayStatus => dayStatus.failed === true)
      const goalAlmostRed = arrayAllTask.some(item => item.failed && !item.success)
      const defaultStatus = arrayAllTask.every(dayStatus => !dayStatus.success && !dayStatus.failed)

       if (greenStatus) {
        return 'greenStatus'
      } else if(goalAlmostSuccess) {
        return 'goalAlmostSuccess'
      } else if(redStatus) {
        return 'redStatus'
      }else if(goalAlmostRed){
        return 'goalAlmostRed'
      } else if (defaultStatus) {
        return 'default'
      }
    }
}