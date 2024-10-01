import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { derivedAsync } from 'ngxtension/derived-async'

import { ElectronService } from '../core/electron.service'

@Component({
  selector: 'aef-electron-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './electron-page.component.html',
  styleUrl: './electron-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElectronPageComponent {
  #electron = inject(ElectronService)

  #rawVersions = derivedAsync(() => this.#electron.api.getVersions<Record<string, string>>())
  dependencies = computed(() => Object.entries(this.#rawVersions() || {}).map(([lib, version]) => ({ lib, version })))
}
