import { Component,ElementRef,ViewEncapsulation, OnInit, ViewChild, ViewChildren, AfterViewInit  } from '@angular/core';
import { FunctionService } from '../function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diary } from '../models';
import { DiaryService } from '../diary.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class DiaryComponent implements OnInit, AfterViewInit{

  preloader: boolean;

  image : string = "https://www.imagehost.at/images/2023/05/05/367520_cloudy_moon_snow_icon.png"

  moodSelected : boolean

  template : string = ``

  isOpenedMoodWindow : boolean 

  isOpenedEnjoyWindow : boolean

  isOpenedPadWindow : boolean

  bold : boolean = false 

  italic : boolean = false

  underline : boolean = false

  fontSize : string = "24";

  fontColor : string = "black";

  fontFamily : string = "Times new Roman";

  diaryTitle : string = "";

  private : boolean

  diaries: Diary[]

  diary: Diary

  var:number

  isOpenedDiaryImageWindow:boolean

  mood : number

  likes:number

  diary_id:number

  @ViewChild('main',{static: false}) main!:ElementRef

  @ViewChild('topBAR',{static: false}) topbar!:ElementRef;

  @ViewChild('imageId',{static: false}) imageId!: ElementRef;

  @ViewChild('diary',{static: false}) diaryPaper!:ElementRef;

  @ViewChild('selector',{static: false}) selector!:ElementRef;

  @ViewChild('popupMain',{static: false}) popupMain!:ElementRef;

  @ViewChild('padMain',{static: false}) padMain!:ElementRef;

  @ViewChild('showMoods',{static: false}) showMoods!:ElementRef;

  @ViewChild('logo',{static: false}) logo!:ElementRef;

  @ViewChild('wrapper',{static: false}) wrapper!:ElementRef;

  @ViewChild('color',{static: false}) color!:ElementRef;

  @ViewChild('selectFontFamily',{static: false}) selectFontFamily!:ElementRef;

  @ViewChild('fontSizeInput',{static: false}) fontSizeInput!:ElementRef;

  @ViewChild('isPublicChecked',{static: false}) isPublicCheck!:ElementRef;

  constructor(private elementRef:ElementRef,private route: ActivatedRoute,private functionService : FunctionService,private diaryService : DiaryService){
    this.preloader = true;
    this.fetchData().then(() => {
      this.preloader = false;
    });
    this.isOpenedDiaryImageWindow = false
    this.isOpenedEnjoyWindow = false
    this.moodSelected = false
    this.isOpenedMoodWindow = false
    this.isOpenedPadWindow = false
    this.fontSize = "24";
    this.fontFamily = "Times New Roman"
    this.diaries = []
    this.diary = {} as Diary
    this.private = false
    this.mood = -1
    this.diary_id = -1
    this.likes = 0
    this.var = 5
  }
  ngOnInit(): void {

  }

  // Home -> Diary -> OpenPopup() -> ActivateSnowPeaks()

  // Profile -> Diary -> ActivateSnowPeaks()


  ngAfterViewInit() {
    this.loadDiary()
    // this.moodSelected = false
    // this.openPopup()
    this.private = false
    this.getDiaries()
  }

  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  openImageSelector(){
    this.isOpenedDiaryImageWindow = true
  }

  closeImageSelector(image:string){
    this.image = image
    this.isOpenedDiaryImageWindow = false
  }
  
  

  loadDiary(){
    if(this.diaryService.loaded_diary.id != -1){ 
      alert('Enjoy your writing!')
      this.diary = this.diaryService.loaded_diary
      this.diaryService.loaded_diary = {
        id: -1,
        title: '',
        body:'',
        description: '',
        isPublic: false,
        likes: 0,
        authorId: 0,
        authorName: '',
        image: 'lol',
        bold: false,
        italic: false,
        underline: false,
        fontSize: '24',
        fontColor: '',
        fontFamily: '',
        mood: -1
      }
      this.moodSelected = false;

      switch (this.diary.mood){
        case 1:
          this.activateSnowPeaks()
          break
        case 2:
          this.activateHell()
          break
        case 3:
          this.activateCozy()
          break
        case 4:
          this.activateRainbow()
          break
        case 5:
          this.activateForest()
          break
        case 6:
          this.activateRainy()
          break
        default:
          alert("ERROR 404! ~^% ( Mood not FOUND )")
      }
      this.fontSize = this.diary.fontSize
      this.fontFamily = this.diary.fontFamily
      this.fontColor = this.diary.fontColor
      this.diaryTitle = this.diary.title
      this.bold = this.diary.bold
      this.italic = this.diary.italic
      this.underline = this.diary.underline
      this.private = this.diary.isPublic
      this.likes = this.diary.likes
      this.image = this.diary.image
      this.mood = this.diary.mood
      this.diary_id = this.diary.id
    }
    else{
      this.moodSelected = false
      this.openPopup()
    }
  }

  changePad(padStyle:Number){
    if(padStyle == 1){
      this.diaryPaper.nativeElement.style.backgroundImage = "url('https://www.imagehost.at/images/2023/04/25/annie-spratt-6a3nqQ1YwBw-unsplash.jpg')"
      this.closePad()
    }
    else if(padStyle == 2){
      this.diaryPaper.nativeElement.style.backgroundImage = "none"
      this.closePad()
    }
    else if(padStyle == 3){
      this.diaryPaper.nativeElement.style.backgroundImage = "url('https://www.imagehost.at/images/2023/04/25/kiwihug-y_2GC4EhOP4-unsplash.jpg')"
      this.closePad()
    }
    else if(padStyle == 4){
      this.diaryPaper.nativeElement.style.backgroundImage = "url('https://www.imagehost.at/images/2023/04/25/marjan-blan-_kUxT8WkoeY-unsplash.jpg')"
      this.closePad()
    }
    else if(padStyle == 5){
      this.diaryPaper.nativeElement.style.backgroundImage = "url('https://www.imagehost.at/images/2023/04/25/nordwood-themes-R53t-Tg6J4c-unsplash.jpg')"
      this.closePad()
    }
    else if(padStyle == 6){
      this.diaryPaper.nativeElement.style.backgroundImage = "url('https://www.imagehost.at/images/2023/04/25/olga-thelavart-vS3idIiYxX0-unsplash.jpg')"
      this.closePad()
    }
  }

  changeTextToBold(){
    if(this.bold == true){
      this.diaryPaper.nativeElement.style.fontWeight = "normal"
      this.bold = false
    }
    else{
      this.diaryPaper.nativeElement.style.fontWeight = "bold"
      this.bold = true
    }
    
  }
  changeTextToItalic(){
    if(this.italic == true){
      this.diaryPaper.nativeElement.style.fontStyle = "normal"
      this.italic = false
    }
    else{
      this.diaryPaper.nativeElement.style.fontStyle = "italic"
      this.italic = true
    }

  }
  changeTextToUnderlined(){
    if(this.underline == true){
      this.diaryPaper.nativeElement.style.textDecoration = "none"
      this.underline = false
    }
    else{
      this.diaryPaper.nativeElement.style.textDecoration = "underline"
      this.underline = true
    }

  }

  changeFontFamily(){
    console.log(this.fontFamily)
    this.diaryPaper.nativeElement.style.fontFamily = this.fontFamily
  }

  changeFontSize(){
    console.log(this.fontSize)
    this.diaryPaper.nativeElement.style.fontSize = (this.fontSize + "px")
  }
  changeFontColor(){
    console.log(this.fontColor)
    this.diaryPaper.nativeElement.style.color = this.fontColor
  }

  changePrivacy(){
    console.log(this.private)
  }

  clearDiary(){
    this.diaryTitle = ""
    this.diaryPaper.nativeElement.value = ""
    this.italic = true
    this.bold = true
    this.underline = true
    this.fontSize = "24";
    this.fontFamily = "Times New Roman"
    this.fontColor = "black"
    this.changeFontColor()
    this.changeFontFamily()
    this.changeFontSize()
    this.changeTextToBold()
    this.changeTextToItalic()
    this.changeTextToUnderlined()
    this.changePad(2)
  }
  
  closePopup(){
    if(this.moodSelected = true){
      this.isOpenedMoodWindow = false
    }
  }

  closePad(){
    this.isOpenedPadWindow = false
    this.padMain.nativeElement.innerHTML = ``
  }

  openPadWindow(){
    if(this.isOpenedPadWindow == false){
      this.isOpenedPadWindow = true
      return 
    }
    else{
      this.closePad()
    }
  }

  openPopup(){
    if(this.isOpenedMoodWindow == false){
      this.isOpenedMoodWindow = true
      return
    }
    else{
      this.closePopup()
    }
  }

  activateSnowPeaks(){
    // alert(this.main)
    this.mood = 1
    this.moodSelected = true
    this.closePopup()
    this.logo.nativeElement.style.background = "rgba(128,128,128,0.4)"
    this.logo.nativeElement.style.borderRadius = "35px"
    this.logo.nativeElement.style.padding = "10px"

    this.wrapper.nativeElement.style.background = "white"
    
    this.main.nativeElement.innerHTML = 
    `
      <img id = "first" src="https://www.imagehost.at/images/2023/04/09/exact2.png">
      <img id = "second" src="https://www.imagehost.at/images/2023/04/09/1680856080738.jpg">
      <img id = "third" src="https://www.imagehost.at/images/2023/04/09/exact.png">
      <img id = "birds" src="https://www.imagehost.at/images/2023/04/09/birdsa3f71722bf22c03e.png">
      <img id = "black" src="https://www.imagehost.at/images/2023/04/11/3840x2160-black-solid-color-background.jpg">
      <img id = "snow" src = "https://www.imagehost.at/images/2023/04/13/Pngtreechristmas-snow-festival_6958744.png">
      <img id = "snow2" src = "https://www.imagehost.at/images/2023/04/13/Pngtreechristmas-snow-festival_6958744.png">
      <p id = "theme">Snow peaks</p>
    `
  }
  activateCozy(){
    this.mood = 3
    this.logo.nativeElement.style.background = "transparent"
    this.closePopup()
    this.wrapper.nativeElement.style.background = "black"
    this.main.nativeElement.innerHTML = 
    `
      <img id = "first2" src="https://www.imagehost.at/images/2023/04/10/IMG_0730.jpg">
      <img id = "second2" src = "https://www.imagehost.at/images/2023/04/10/bed.png">
      <div id = "green"></div>
      <img id = "third2" src = "https://www.imagehost.at/images/2023/04/11/dada.jpg">
      <p id = "theme2">Cozy</p>
    `
  }
  activateHell(){
    this.mood = 2
    this.moodSelected = true
    this.logo.nativeElement.style.background = "transparent"
    this.closePopup()
    this.wrapper.nativeElement.style.background = "black"
    this.main.nativeElement.innerHTML = `
      <img id = "first3" src="https://www.imagehost.at/images/2023/04/07/2110.w023.n001.1224B.p1.1224.jpg.png">
      <img id = "second3" src="https://www.imagehost.at/images/2023/04/14/vulcanBackground.jpg">
      <img id = "third3" src="https://www.imagehost.at/images/2023/04/12/vulcan17bee94b9d108e2c7.png">
      <p id = "theme3" >Hell</p>
      
      <img id = "fourth3" src="https://www.imagehost.at/images/2023/04/12/normal.png">
    `
  }
  activateForest(){
    this.mood = 5
    this.moodSelected = true
    this.logo.nativeElement.style.background = "transparent"
    this.wrapper.nativeElement.style.background = "black"
    this.closePopup()
    this.main.nativeElement.innerHTML = 
    `
      <img id = "first4" src="https://www.imagehost.at/images/2023/04/11/layer-front.png">
      <img id = "second4" src="https://www.imagehost.at/images/2023/04/11/layer-base.png">
      <img id = "third4" src="https://www.imagehost.at/images/2023/04/11/layer-middle.png">
      <img id = "fourth4" src="https://www.imagehost.at/images/2023/04/11/dungeon.jpg">
      <p id = "theme4">Forest</p>
    `
        
  }
  activateRainbow(){
    this.mood = 4
    this.moodSelected = true
    this.logo.nativeElement.style.background = "transparent"
    this.closePopup()
    this.wrapper.nativeElement.style.background = "black"
    this.main.nativeElement.innerHTML = 
    `
      <img id = "first5" src="https://www.imagehost.at/images/2023/04/11/rainbow2.png">
      <img id = "second5" src="https://www.imagehost.at/images/2023/04/11/Lovepik_com-401941519-summer-rainbow-sky.jpg">
      <img id = "third5" src="https://www.imagehost.at/images/2023/04/12/5326031.png">
      <p id = "theme5">Rainbow</p>
    `
  }
  activateRainy(){
    this.mood = 6

    this.moodSelected = true
    this.logo.nativeElement.style.background = "transparent"
    this.wrapper.nativeElement.style.background = "black"
    this.closePopup()
    this.main.nativeElement.innerHTML =  
    `
      <img id = "second6" src="https://www.imagehost.at/images/2023/04/23/IMG_1260-1.jpg">
      <img id = "first6" src="https://www.imagehost.at/images/2023/04/23/IMG_1260-12.png">
      <img id = "black6" src="https://www.imagehost.at/images/2023/04/11/3840x2160-black-solid-color-background.jpg">
      
      <p id = "theme6">Rainy</p>
    `
  }

  getDiary(diary_id:number){
    this.diaryService.getDiary(diary_id).subscribe((diary) => {
      this.diary = diary
    })
  }

  getDiaries(){
    this.diaryService.getDiaries().subscribe((diaries) => {
      this.diaries = diaries
    })
  }
  getDiariesOfUser(authorId:number){
    this.diaryService.getDiariesOfUser(this.functionService.id).subscribe((diaries) => {
      this.diaries = diaries
    })
  }

  postDiary(){
    this.functionService.changeNameMail()

    this.diaryService.postDiary(this.diaryTitle,this.diaryPaper.nativeElement.value,"Today is a good day to write " + this.diaryTitle,this.private,this.likes,this.functionService.id,this.functionService.usernameMain,this.image,this.bold,this.italic,this.underline,this.fontSize,this.fontColor,this.fontFamily,this.mood).subscribe(() => {

    })
  }

  changeImage(){
    this.image = this.imageId.nativeElement.value
  }

  
  downloadDiary(){

    const doc = new jsPDF();
    const text = this.diaryPaper.nativeElement.value

    doc.text(text, 10, 10);
    doc.setFontSize(Number(this.fontSize))
    doc.setTextColor(this.fontColor.toUpperCase())
    const title :string = "MyDiary " + this.diaryTitle + ".pdf"
    doc.save(title);
    

  }


}
