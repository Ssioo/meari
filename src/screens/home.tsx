import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeArea } from 'components/layout'
import { Layout, ViewPager } from '@ui-kitten/components'

export const HomeScreen = () => (
  <SafeArea>
    <Text>듣고 싶은 작품을 선택해주세요.</Text>
    <GalleryPager />
  </SafeArea>
)

const GalleryPager = () => {
  const [page, setPage] = useState(0)
  return (
    <ViewPager selectedIndex={page} onSelect={setPage}>
      <Layout style={styles.pageContainer}>
        <Text>Page 1</Text>
      </Layout>
      <Layout style={styles.pageContainer}>
        <Text>Page 2</Text>
      </Layout>
    </ViewPager>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
  },
})
