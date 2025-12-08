import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Top from '../components/ui/Top';
import Breadcrumb from '../components/Breadcrumb';

function Privacy() {
  return (
    <>
      <Header showSearchBar={true} /> 
      <div className="max-w-4xl mx-auto p-6 bg-white">
          <Breadcrumb
                                      items={[
                                          { label: "首頁", to: "/" },
                                          { label: "Privacy" }
                                      ]}
                                      className="mb-6 text-gray-500"
                                  />
          {/* 標題 */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-primary pb-2 inline-block">隱私權政策</h1>
          
          {/* 內容區塊 */}
          <div className="space-y-8 leading-relaxed">
            
            <p className="text-sm text-gray-600">
              最近更新日期：2025年11月7日
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-3">一、 我們收集的資訊</h2>
              <p>
                為了提供您更好的服務，OpenTicket 會收集您在註冊、購票或使用本服務時提供的個人資料，包括但不限於姓名、電子郵件地址、電話號碼及付款資訊。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">二、 資訊的使用方式</h2>
              <p>
                我們將您的資訊用於處理您的交易、提供客戶服務、改善我們的產品與服務，以及在您同意的情況下發送行銷通訊。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">三、 聯絡我們</h2>
              <p>
                如您對本政策有任何疑問，請透過 <a href="mailto:openticketoffice@gmail.com" className="text-primary hover:underline">openticketoffice@gmail.com</a> 與我們聯絡。
              </p>
            </section>
            
          </div>

      </div>
      <Top />
      <Footer />
    </>
  );
}

export default Privacy;