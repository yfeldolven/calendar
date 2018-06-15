// just a test 
// better make it as object so u can edit anywhere
// just a test of small calender


let model = {

    d : new Date() ,

    Month : [ 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31 ],

    monthName : [ 'Jan' , 'Fab' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec' ] ,

    dayIndex : [ 2 , 3 , 4 ,5 , 6 , 7 , 1 ],

    dayName : [ 'Sat' , 'Sun' , 'Mon' , 'Tu' , 'Wed' , 'Thu' , 'Fri' ],

    newDate : new Date() ,

    today : function(){
        return this.newDate.getDate() ;
    } ,

    currentTime : function() {
        return this.d.setFullYear(this.d.getFullYear() , this.d.getMonth() , 1) ;
    } ,

    fDay : function(){
        return this.dayIndex[model.d.getDay()] ;
    }

}





let control = {

    clickEvents : function(){
        document.addEventListener('click' , function(e){

            
            if( e.target.tagName === 'BUTTON' && e.target.textContent === 'Next' ){

                model.d.setFullYear( model.d.getFullYear() , model.d.getMonth()+1 , 1 ) ;

                document.getElementsByTagName('TABLE')[0].textContent = '';

                
                e.target.parentElement.textContent = '';
                    
                view.htmlBar( 
                    model.monthName[ model.d.getMonth() ] ,
                    model.d.getFullYear()
                ) ;

                view.tableWeek();

                view.tableMonth(
                    model.Month[model.d.getMonth()] ,
                    model.fDay() ,
                    model.today() ,
                    model.d.getFullYear() + model.monthName[ model.d.getMonth() ] ,
                    model.newDate.getFullYear() +  model.monthName[ model.newDate.getMonth() ]
                );
                
            }




            if( e.target.tagName === 'BUTTON' && e.target.textContent === 'Pre' ){
                
                model.d.setFullYear( model.d.getFullYear() , model.d.getMonth()-1 , 1 ) ;

                document.getElementsByTagName('TABLE')[0].textContent = '';

                
                e.target.parentElement.textContent = '';
                    
                view.htmlBar(
                     model.monthName[ model.d.getMonth() ] ,
                     model.d.getFullYear()
                    ) ;

                view.tableWeek();

                view.tableMonth(
                    model.Month[model.d.getMonth()] ,
                    model.fDay() ,
                    model.today(),
                    model.d.getFullYear() + model.monthName[ model.d.getMonth() ] ,
                    model.newDate.getFullYear() +  model.monthName[ model.newDate.getMonth() ]
                );
            }




            if(e.target.tagName === 'TD'){

                let testDate = new Date() ,
                    day = testDate.setFullYear( model.d.getFullYear() , model.d.getMonth() , e.target.textContent ) ;


                if( testDate.getFullYear() > model.newDate.getFullYear() ||

                    ( testDate.getFullYear() == model.newDate.getFullYear() && 
                    testDate.getMonth() > model.newDate.getMonth()  ) ||

                    ( testDate.getMonth() == model.newDate.getMonth() &&
                    testDate.getDate() >= model.newDate.getDate()  )
                ){

                    console.log( 'this is after today' );

                }

            }

            

        })
    },


    render : function(){

        view.htmlBar( 
            model.monthName[ model.d.getMonth() ] ,
            model.d.getFullYear()
        );

        this.clickEvents();

        view.tableWeek();

        view.tableMonth(
            model.Month[model.d.getMonth()] ,
            model.fDay() ,
            model.today(),
            model.d.getFullYear() + model.monthName[ model.d.getMonth() ] ,
            model.newDate.getFullYear() +  model.monthName[ model.newDate.getMonth() ]

        );
    }

}




let view = {
    htmlBar : function( month , year ){
        let next = document.createElement('button'),
            pre = document.createElement('button'),
            monthName = document.createElement('span'),
            div = document.getElementsByTagName('DIV')[0],
            fakeD = document.createDocumentFragment();


        next.textContent = 'Next';
        pre.textContent = 'Pre';
        monthName.textContent = month + '  '  + year ;
        
        fakeD.appendChild(next);
        fakeD.appendChild(monthName);
        fakeD.appendChild(pre);

        div.appendChild(fakeD);

        
    },


    tableWeek : function(){
        for (let i=1 ; i<=7 ; i++ ){
            let p = document.createElement('th'),
            tr = document.createElement('tr');
    
            p.textContent = model.dayName[i-1];
            document.querySelector('table').appendChild(p);
    
            if ( i == 7 ) {
                document.querySelector('table').appendChild(tr);
            }
        }
    } ,


    tableMonth : function( month , wastedDays , today , date1 , date2){
        for ( let s =1 , week = 1 ; s <= month + wastedDays-1 ; s++ , week++) {

            let p = document.createElement('td'),
                tr = document.createElement('tr');
        
        
        
            if ( s < wastedDays ){
        
                p.textContent =  '' ;
                document.querySelector('table').appendChild(p);
        
            }

        
            if ( date1 === date2  &&  s- wastedDays +1 == today ){
               p.setAttribute('class', 'today');
            }
        
        


            if ( s > wastedDays -1 ){

                p.textContent = s - wastedDays + 1 ;
        
                document.querySelector('table').appendChild(p);
              
              
                if ( week == 7 ){
              
                  document.querySelector('table').appendChild(tr);
                  week = 0 ;
              
                }

            }
        }
        
    }


}



control.render(); 