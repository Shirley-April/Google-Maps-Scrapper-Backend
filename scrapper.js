export default async function scrapeGoogleMaps() {
    const browser = await launch()
    const page = await browser.newPage()
  
    await page.goto('https://www.google.com/maps')
  
    const searchSelector = '#searchboxinput'
    await page.waitForSelector(searchSelector)
    await page.type(searchSelector, 'supermarkets in nairobi')
  
    const searchBtnSelector = '#searchbox-searchbutton'
    await page.waitForSelector(searchBtnSelector)
    await page.click(searchBtnSelector)
  
    const scrollableSection = await page.$('.e07Vkf.kA9KIf')
  
    let contents = []
  
    if (scrollableSection) {
      const targetContentsCount = 4 // Number of results to extract
  
      // Scroll up to extract contents until reaching the target count
      while (contents.length < targetContentsCount) {
        // Extract content from each element within the scrollable section
        const extractedContents = await page.$$eval(
          '.e07Vkf.kA9KIf .qBF1Pd.fontHeadlineSmall ',
          (elements) => elements.map((element) => element.textContent)
        )
  
        contents = contents.concat(extractedContents)
  
        await scrollUp(page, scrollableSection)
      }
  
      // Keep only the first `targetContentsCount` contents
      contents = contents.slice(0, targetContentsCount)
  
      console.log('Extracted Contents:', contents)
    } else {
      console.log('Scrollable section not found.')
    }
  
    return contents
  }
  
  const scrollUp = async (page, element) => {
    await page.evaluate(async (section) => {
      section.scrollTop -= 100 // Adjust the scroll amount as needed
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for a moment after scrolling
    }, element)
  }