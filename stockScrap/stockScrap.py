# %%
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time, datetime, csv

options = webdriver.ChromeOptions()
options.binary_location = "C:\Program Files\Google\Chrome\Application\chrome.exe"
chrome_driver_binary = "./chromedriver.exe"
driver = webdriver.Chrome(chrome_driver_binary, chrome_options=options)
driver.maximize_window()

try:
    print("\nStep 1: go to link\n")
    driver.get('https://www.hkex.com.hk/Market-Data/Securities-Prices/Equities/Equities-Quote?sym=1&sc_lang=zh-hk')
except:
    pass


# %%
import traceback 
while True:
    for share in ["1", "2", "3", "4", "5","6", "7", "8", "9", "10","11", "12", "13", "14", "15","16", "17", "18", "19", "20",]:

        try: 
            stock_Symbol = share.zfill(5)
            print("\nthe share is " + stock_Symbol)
            driver.get('https://www.hkex.com.hk/Market-Data/Securities-Prices/Equities/Equities-Quote?sym='+share+ '&sc_lang=zh-hk')
            # driver.switch_to.default_content() 
            # inputElem = driver.find_element_by_css_selector('[id="tags"]')
            # inputElem.send_keys(Keys.BACKSPACE * 5)
            # inputElem.send_keys(share)
            time.sleep(5)
            print("scraping data")
            driver.switch_to.default_content() 

            stock_name = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[1]/span[1]'
                )
            price = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[1]/p[2]/span[2]'
                )
            close = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[1]/dt'
                )
            open_price = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[2]/dt'
                )
            volume_hkd = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[3]/dt'
                )
            volume_ltc = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[4]/dt'
                )
            low = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[2]/td[2]'
                )
            high = driver.find_element_by_xpath(
                    '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[2]'
                )
            
            # data = ["date","stock_Symbol", "stock_name","price","open", "low", "close", "high", "volume_ltc","volume_hkd"]
            data =[]
            data.append( str(datetime.datetime.now())[0:19] )
            data.append( str(stock_Symbol))
            data.append( str(stock_name.text.strip().split('\n')[-1] ))
            data.append( str(price.text.strip().split('\n')[-1] ))
            data.append( str(open_price.text.strip().split('\n')[-1] ))    
            data.append( str(low.text.strip().split('\n')[-1] ))
            data.append( str(close.text.strip().split('\n')[-1] ) ) 
            data.append( str(high.text.strip().split('\n')[-1] ))
            data.append( str(volume_ltc.text.strip().split('\n')[-1] ) ) 
            data.append( str(volume_hkd.text.strip().split('\n')[-1] )  )
            driver.switch_to.default_content() 

            print("save data")
            with open(r"scrapResult.csv", "at", newline="") as f:
          
                writer = csv.writer(f)
                if f.tell() <= 0:
                    writer.writerow(["date","stock_Symbol", "stock_name","price","open_price", "low", "close", "high", "volume_ltc","volume_hkd"])
                writer.writerow(data)
                print(data)
            # f = open(r"scrapResult.csv", "at", newline="")
            # f.writelines("123")
            # print("f file write file")          
            time.sleep(2)
        except Exception as e:
            
            traceback.print_exc()
            continue      
    print("\nwait for next scraping in 60 second")
    time.sleep(10)


# %%
# print(driver.find_element_by_xpath(
#                     '//*[@id="lhkexw-quoteequities"]/div[1]/span[1]'
#                 ).text)


# %%
# print("testing: mock save csv")
# data = [1,2]
# with open(r"scrapResult.csv", "at", newline="") as f:
#         writer = csv.writer(f)
#         if f.tell() <= 0:
#             writer.writerow(["date","stock_Symbol", "stock_name","price","open", "low", "close", "high", "volume_ltc","volume_hkd"])
#         print(data)
#         writer.writerow(data)
# print("write testing file")          
# time.sleep(2)