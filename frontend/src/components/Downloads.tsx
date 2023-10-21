import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeDownloadsState } from '../atoms/downloads'
import { listViewState } from '../atoms/settings'
import { loadingAtom } from '../atoms/ui'
import DownloadsCardView from './DownloadsCardView'
import DownloadsListView from './DownloadsListView'

const Downloads: React.FC = () => {
  const listView = useRecoilValue(listViewState)
  const active = useRecoilValue(activeDownloadsState)

  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)

  useEffect(() => {
    if (active) {
      setIsLoading(false)
    }
  }, [active?.length, isLoading])

  if (listView) {
    return (
      <DownloadsListView />
    )
  }

  return (
    <DownloadsCardView />
  )
}

export default Downloads