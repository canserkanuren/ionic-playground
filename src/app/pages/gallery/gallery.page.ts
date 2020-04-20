import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Photo } from '@models/photo';
import { PhotoService } from '@services/photo/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit {
  pictures = [];
  constructor(
    private platform: Platform,
    private imagePicker: ImagePicker,
    private photoService: PhotoService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
    this.pictures = this.photoService.photos;
  }

  takePicture() {
    this.photoService.addNewToGallery();
  }

  async openGallery() {
    if (this.platform.is('cordova')) {
      const hasPermission = await this.imagePicker.hasReadPermission();
      if (hasPermission) {
        await this.showGalleryPicker();
      } else {
        await this.imagePicker.requestReadPermission();
        await this.showGalleryPicker();
      }
    }
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        },
        {
          text: 'Show picture',
          icon: 'scan-outline',
          role: 'show',
          handler: () => {
            this.displayImage(photo);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }
      ]
    });
    await actionSheet.present();
  }

  isGalleryAvailable(): boolean {
    return this.platform.is('cordova');
  }

  displayImage(photo: Photo) {
    if (this.isGalleryAvailable()) {
      this.photoService.showPicture(photo.filepath || photo.webviewPath);
    }
  }

  private async showGalleryPicker() {
    const pictures = await this.imagePicker.getPictures({});
    console.log(pictures);
  }
}
