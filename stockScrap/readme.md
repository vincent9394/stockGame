# 1. install latest python
## For linux
### check if there is python
```bash
python3 --version
```

### check if there is pip/pip3/conda
```bash
pip
python3
conda 
```

## For windows
### Download the installer from the websites
https://www.python.org/downloads/
```
sudo apt install python3-pip
```

# 2. install selenium
```
pip install -U selenium 
```
# 3. run the programme
```
python3 '.\stockScrap.py'
```



# stock_name = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[1]/span[1]'
            #     )
            # price = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[1]/p[2]/span[2]'
            #     )
            # close = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[1]/dt'
            #     )    
            # open = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[2]/dt'
            #     )
            # volume_hkd = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[3]/dt'
            #     )
            # volume_ltc = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[4]/dt'
            #     )
            # low = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[2]/td[2]'
            #     )
            # high = driver.find_element(By.XPATH,
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[2]'
            #     )


            # stock_name = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[1]/span[1]'
            #     )
            # price = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[1]/p[2]/span[2]'
            #     )
            # close = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[1]/dt'
            #     )    
            # open = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[2]/dt'
            #     )
            # volume_hkd = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[3]/dt'
            #     )
            # volume_ltc = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[2]/div[1]/dl[4]/dt'
            #     )
            # low = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[2]/td[2]'
            #     )
            # high = driver.find_element("xpath",
            #         '//*[@id="lhkexw-quoteequities"]/div[2]/div[1]/div[3]/table/tbody/tr[1]/td[2]'
            #     )