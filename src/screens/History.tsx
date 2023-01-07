import { ScreenHeader } from '@components/ScreenHeader'
import { Center, VStack } from 'native-base'

export function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
    </VStack>
  )
}
