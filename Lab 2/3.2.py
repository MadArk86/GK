import pygame
import math

# Define colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
PURPLE = (216, 191, 216)

class Transforms2D:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((600, 600))
        pygame.display.set_caption("2D Transforms")
        self.clock = pygame.time.Clock()

        self.transform_options = ["None", "No. 1", "No. 2", "No. 3", "No. 4", "No. 5", "No. 6", "No. 7", "No. 8", "No. 9"]
        self.current_transform = 0  # Default: No transformation

    def draw(self):
        self.screen.fill(WHITE)

        center = (300, 300)

        wierzcholki = 10
        polygon_points = []
        for i in range(wierzcholki):
            posX = int(150 * math.cos(i * (2 * math.pi / wierzcholki)))
            posY = int(150 * math.sin(i * (2 * math.pi / wierzcholki)))
            polygon_points.append((center[0] + posX, center[1] + posY))

        pygame.draw.polygon(self.screen, BLACK, polygon_points, 5)
        pygame.draw.polygon(self.screen, PURPLE, polygon_points)

        pygame.display.flip()

    def apply_transform(self, transform_index):
        self.screen.fill(WHITE)  # Czyszczenie ekranu przed narysowaniem nowego kształtu

        center = (300, 300)

        wierzcholki = 10
        polygon_points = []
        for i in range(wierzcholki):
            posX = int(150 * math.cos(i * (2 * math.pi / wierzcholki)))
            posY = int(150 * math.sin(i * (2 * math.pi / wierzcholki)))
            polygon_points.append((posX, posY))  # Teraz punkty są w odniesieniu do środka

        # Obliczenie środka wielokąta
        center_x = sum(x for x, y in polygon_points) / len(polygon_points)
        center_y = sum(y for x, y in polygon_points) / len(polygon_points)

        if transform_index == 1:
            polygon_points = [(point[0] * 0.35, point[1] * 0.35) for point in polygon_points]
        elif transform_index == 2:
            polygon_points = [(point[0] * math.cos(math.radians(60)) - point[1] * math.sin(math.radians(60)),
                               point[0] * math.sin(math.radians(60)) + point[1] * math.cos(math.radians(60)))
                              for point in polygon_points]
        elif transform_index == 3:
            polygon_points = [(-point[0] * 0.3, point[1] * 0.8) for point in polygon_points]
        elif transform_index == 4:
            polygon_points = [(point[0] + 0.35 * point[1], point[1]) for point in polygon_points]
        elif transform_index == 5:
            polygon_points = [(point[0], point[1] * 0.3) for point in polygon_points]
        elif transform_index == 6:
            polygon_points = [(point[0] - 0.3 * point[1], point[1]) for point in polygon_points]
        elif transform_index == 7:
            polygon_points = [(point[0] * 0.3, point[1] * 0.9) for point in polygon_points]
        elif transform_index == 8:
            polygon_points = [(point[0] * math.cos(math.radians(45)) - point[1] * math.sin(math.radians(45)),
                               point[0] * math.sin(math.radians(45)) + point[1] * math.cos(math.radians(45)))
                              for point in polygon_points]
        elif transform_index == 9:
            polygon_points = [(point[0] * math.sin(math.radians(180)) + point[1] * math.cos(math.radians(180)),
                              -point[0] * math.cos(math.radians(180)) + point[1] * math.sin(math.radians(180)))
                              for point in polygon_points]

        # Przesunięcie wielokąta do środka ekranu
        polygon_points = [(point[0] + center[0] - center_x, point[1] + center[1] - center_y) for point in polygon_points]

        pygame.draw.polygon(self.screen, BLACK, polygon_points, 5)
        pygame.draw.polygon(self.screen, PURPLE, polygon_points)

        pygame.display.flip()

    def run(self):
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    elif pygame.K_1 <= event.key <= pygame.K_9:
                        self.current_transform = event.key - pygame.K_1 + 1
                        self.apply_transform(self.current_transform)

            self.clock.tick(30)

        pygame.quit()

if __name__ == "__main__":
    game = Transforms2D()
    game.run()
