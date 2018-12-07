import { Injectable, Inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

interface SidepaneBackdropConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: SidepaneBackdropConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable({
  providedIn: 'root'
})
export class BackdropService {

  constructor(
    private overlay: Overlay) {
  }

  open(config: SidepaneBackdropConfig = {}) {
    // Override default configuration
    const dialogConfig = {...DEFAULT_CONFIG, ...config};

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(FilePreviewOverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
  }

  private createOverlay(config: SidepaneBackdropConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: SidepaneBackdropConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
