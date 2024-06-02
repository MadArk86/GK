import pygame
import sys

class TransformedShapes(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((600, 600))
        self.rect = self.image.get_rect()
        self.image.fill((255, 255, 255))
        self.rect.topleft = (0, 0)

    def draw(self):
        self.image.fill((255, 255, 255))

        # Drawing a square
        square_color = (0, 255, 0)
        square_center = (300, 300)
        square_side_length = 100
        pygame.draw.rect(self.image, square_color, (square_center[0] - square_side_length / 2, square_center[1] - square_side_length / 2, square_side_length, square_side_length))

        # Drawing a triangle
        triangle_color = (255, 255, 255)
        triangle_vertices = [(-50, 50), (50, 50), (0, -5)]
        triangle_vertices = [(v[0] + 300, v[1] + 300) for v in triangle_vertices]  # Translate vertices to new center
        pygame.draw.polygon(self.image, triangle_color, triangle_vertices)

    def update(self):
        self.draw()

def main():
    pygame.init()
    screen = pygame.display.set_mode((600, 600))
    pygame.display.set_caption("Drawing With Transforms")
    clock = pygame.time.Clock()

    shapes = TransformedShapes()
    shapes.draw()

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.blit(shapes.image, shapes.rect)
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
